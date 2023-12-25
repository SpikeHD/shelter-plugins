import { css, classes } from './PerformancePage.tsx.scss'
import { Dropdown } from '../components/Dropdown.tsx'

const {
  ui: {
    injectCss,
    openConfirmationModal,
    SwitchItem,
    Button,
    Header,
    HeaderTags,
    Text,
    showToast
  },
  solid: { createSignal, createEffect },
} = shelter

const { invoke, process } = window.__TAURI__

let injectedCss = false

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

interface Settings {
  cache_css: boolean;
  streamer_mode_detection: boolean;
  rpc_server: boolean;
  auto_clear_cache: boolean;
  disable_hardware_accel: boolean;
  blur: 'none' | 'blur' | 'acrylic' | 'mica' | 'vibrancy';
  blur_css: boolean;
}

export function PerformancePage() {
  const [state, setState] = createSignal<Settings>({
    cache_css: false,
    streamer_mode_detection: false,
    rpc_server: false,
    auto_clear_cache: false,
    disable_hardware_accel: false,
    blur: 'none',
    blur_css: false,
  })
  const [platform, setPlatform] = createSignal<string>('')
  const [blurOptions, setBlurOptions] = createSignal<string[]>([])
  const [isLinux, setIsLinux] = createSignal<boolean>(false)

  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  createEffect(async () => {
    const settings = await invoke('read_config_file')
    const availableBlurs = await invoke('available_blurs')
    const defaultConf = await invoke('default_config')

    setBlurOptions(availableBlurs)
    setIsLinux((await invoke('get_platform')) === 'linux')

    try {
      const platform = await invoke('get_platform')
      setPlatform(platform)
    } catch(e) { /* this can fail it's fine */ }

    try {
      setState(JSON.parse(settings))
    } catch (e) {
      setState(JSON.parse(defaultConf))
    }
  })

  const saveSettings = async () => {
    await invoke('write_config_file', {
      contents: JSON.stringify(state()),
    })

    process.relaunch()
  }

  const clearCSSCache = async () => {
    await invoke('clear_css_cache')
    showToast({
      title: 'CSS Cache Cleared',
      duration: 3000
    })
  }

  const clearWebCache = () => {
    openConfirmationModal({
      body: () => `
      Clearing web cache will log you out and reset your settings, but can often help solve permission-based issues.
      \n\n
      Do you want to proceed?
      `,
      header: () => 'Are you sure?',
      type: 'neutral',
      confirmText: 'Confirm',
    }).then(
      () => invoke('set_clear_cache'),
      () => {},
    )
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>Dorion Performance Settings</Header>

      <Header class={classes.shead}>Cache</Header>
      <SwitchItem
        value={state().cache_css}
        onChange={(v) =>
          setState({
            ...state(),
            cache_css: v,
          })
        }
        note="Save CSS to disk that would otherwise be loaded from the web, decreasing load times."
      >
        Cache CSS
      </SwitchItem>

      <SwitchItem
        value={state().auto_clear_cache}
        onChange={(v) =>
          setState({
            ...state(),
            auto_clear_cache: v,
          })
        }
        disabled={platform() !== 'windows'}
        tooltipNote={platform() !== 'windows' && 'This is only supported on Windows right now.'}
        note="Clean out the web-based cache every time you close Dorion. This is usually cached images, scripts, and other data, and it can build up!"
      >
        Auto Clear Cache
      </SwitchItem>

      <Header class={classes.shead}>Optional Features</Header>
      <SwitchItem
        value={state().streamer_mode_detection}
        onChange={(v) =>
          setState({
            ...state(),
            streamer_mode_detection: v,
          })
        }
        note="Detect OBS and Streamlabs OBS and automatically enable streamer mode when they are running."
      >
        Streamer Mode detection
      </SwitchItem>

      <SwitchItem
        value={state().rpc_server}
        onChange={(v) =>
          setState({
            ...state(),
            rpc_server: v,
          })
        }
        tooltipNote="This is a work in progress, and won't do EVERYTHING arRPC does quite yet."
        note="Enable the integrated RPC server, eliminating the need for a separate arRPC server running. Remember to enable the shelteRPC/arRPC plugin!"
      >
        Integrated rich presence server
      </SwitchItem>

      <SwitchItem
        value={state().disable_hardware_accel}
        onChange={(v) =>
          setState({
            ...state(),
            disable_hardware_accel: v,
          })
        }
        note="Disable hardware acceleration, which may cause issues on some systems. Disabling this can also cause performance issues on some systems. Unsupported on macOS."
        disabled={platform() === 'macos'}
      >
        Disable Hardware Acceleration
      </SwitchItem>

      <Header class={classes.shead}>Blur</Header>
      <Text>
        The blurring effect can be unreliable, semi-broken, and extremely slow, depending on what OS and version you are on. For more context, see <a href="https://github.com/tauri-apps/window-vibrancy#available-functions" target="_blank">the window-vibrancy crate</a>.
      </Text>

      <Dropdown
        value={state().blur}
        selected={state().blur}
        onChange={(e) =>
          setState({
            ...state(),
            blur: e.target.value as any,
          })
        }
        options={blurOptions().map((b) => ({
          label: capitalize(b),
          value: b,
        }))}
        disabled={isLinux()}
      />

      <SwitchItem
        value={state().blur_css}
        onChange={(v) =>
          setState({
            ...state(),
            blur_css: v,
          })
        }
        note="Enable this if you are not using a theme designed to take advantage of transparent windows."
        disabled={isLinux()}
      >
        Enable builtin background transparency CSS
      </SwitchItem>

      <div class={classes.pbuttons}>
        <Button
          onClick={saveSettings}
          style={{ width: '30%', padding: '18px' }}
          grow={true}
        >
          Save and Restart
        </Button>

        <Button
          onClick={clearWebCache}
          style={{ width: '30%', padding: '18px' }}
          grow={true}
        >
          Wipe all web-based data
        </Button>

        <Button
          onClick={clearCSSCache}
          style={{ width: '30%', padding: '18px' }}s
          grow={true}
        >
          Clear CSS Cache
        </Button>
      </div>
    </>
  )
}
