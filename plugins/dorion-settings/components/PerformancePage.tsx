import { css, classes } from './PerformancePage.tsx.scss'

const {
  ui: {
    injectCss,
    openConfirmationModal,
    ModalRoot,
    ModalHeader,
    ModalBody,
    ModalFooter,
    SwitchItem,
    Button,
    ButtonLooks,
    Header,
    HeaderTags,
    showToast
  },
  solid: { createSignal, createEffect },
} = shelter

const { invoke, process } = (window as any).__TAURI__

let injectedCss = false

interface Settings {
  cache_css: boolean;
  streamer_mode_detection: boolean;
  rpc_server: boolean;
}

export function PerformancePage() {
  const [state, setState] = createSignal<Settings>({
    cache_css: false,
    streamer_mode_detection: false,
    rpc_server: false,
    auto_clear_cache: false,
  })
  const [platform, setPlatform] = createSignal<string>('')

  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  createEffect(async () => {
    const settings = await invoke('read_config_file')
    const defaultConf = await invoke('default_config')

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
