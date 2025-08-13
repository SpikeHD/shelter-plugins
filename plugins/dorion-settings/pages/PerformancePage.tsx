import { appName, backendRestartRequired, invoke } from '../../../api/api.js'
import { css, classes } from './PerformancePage.tsx.scss'
import { Dropdown } from '../../../components/Dropdown.jsx'
import { WarningCard } from '../components/WarningCard.jsx'
import { defaultConfig } from '../util/settings.js'

const {
  ui: {
    injectCss,
    openConfirmationModal,
    SwitchItem,
    Button,
    Header,
    HeaderTags,
    showToast
  },
  solid: { createSignal, createEffect },
} = shelter

let injectedCss = false

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export function PerformancePage() {
  const [state, setState] = createSignal<DorionSettings>(defaultConfig)
  const [platform, setPlatform] = createSignal<string>('')
  const [blurOptions, setBlurOptions] = createSignal<string[]>([])
  const [restartRequired, setRestartRequired] = createSignal(false)

  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const setSettings = (fn: (DorionSettings) => DorionSettings, requiresRestart?: boolean) => {
    setState(fn(state()))

    // Save the settings
    invoke('write_config_file', {
      contents: JSON.stringify(fn(state())),
    })

    // If a restart is now required, set that
    if (requiresRestart) {
      setRestartRequired(true)
      backendRestartRequired(true)
    }
  }

  createEffect(async () => {
    const settings = await invoke('read_config_file')
    const defaultConf = await invoke('default_config')

    try {
      const availableBlurs = await invoke('available_blurs')
      setBlurOptions(availableBlurs)
    
    // eslint-disable-next-line
    } catch(e) { /* this can fail it's fine */ }

    try {
      const platform = await invoke('get_platform')
      setPlatform(platform)
    
    // eslint-disable-next-line
    } catch(e) { /* this can fail it's fine */ }

    try {
      setState(JSON.parse(settings))
    // eslint-disable-next-line
    } catch (e) {
      setState(JSON.parse(defaultConf))
    }

    // @ts-expect-error cry about it
    setRestartRequired(window?.__DORION_RESTART__ === true)
  })

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
      <Header tag={HeaderTags.H1} class={classes.tophead}>Performance Settings</Header>

      {restartRequired() && (
        <WarningCard />
      )}

      <Header class={classes.shead}>Cache</Header>
      <SwitchItem
        value={state().cache_css}
        onChange={(v) =>
          setSettings((settings) => (
            {
              ...settings,
              cache_css: v,
            }
          ), true)
        }
        note="Save CSS to disk that would otherwise be loaded from the web, decreasing load times."
      >
        Cache CSS
      </SwitchItem>

      <SwitchItem
        value={state().auto_clear_cache}
        onChange={(v) =>
          setSettings((settings) => (
            {
              ...settings,
              auto_clear_cache: v,
            }
          ), true)
        }
        disabled={platform() !== 'windows'}
        tooltipNote={platform() !== 'windows' && 'This is only supported on Windows right now.'}
        note={`Clean out the web-based cache every time you close ${appName}. This is usually cached images, scripts, and other data, and it can build up!`}
      >
        Auto Clear Cache
      </SwitchItem>

      <Header class={classes.shead}>Optional Features</Header>
      <SwitchItem
        value={state().win7_style_notifications}
        onChange={(v) =>
          setSettings((settings) => (
            {
              ...settings,
              win7_style_notifications: v,
            }
          ), true)
        }
        note="Use the alternative notification style used on Windows 7. This is only supported on Windows."
        disabled={platform() !== 'windows'}
      >
        Alternative Notification Style
      </SwitchItem>

      <SwitchItem
        value={state().streamer_mode_detection}
        onChange={(v) =>
          setSettings((settings) => (
            {
              ...settings,
              streamer_mode_detection: v,
            }
          ), false)
        }
        note={
          <>
            Detect OBS and Streamlabs OBS and automatically enable streamer mode when they are running. <b>Requires the integrated RPC server and RPC process scanning to be enabled (found in the Rich Presence tab).</b>
          </>
        }
        disabled={!state().rpc_server}
      >
        Streamer Mode detection
      </SwitchItem>

      <SwitchItem
        value={state().disable_hardware_accel}
        onChange={(v) =>
          setSettings((settings) => (
            {
              ...settings,
              disable_hardware_accel: v,
            }
          ), true)
        }
        note="Disable hardware acceleration, which may cause issues on some systems. Disabling this can also cause performance issues on some systems. Unsupported on macOS."
        disabled={platform() === 'macos'}
      >
        Disable Hardware Acceleration
      </SwitchItem>

      <SwitchItem
        value={state().client_plugins || state().client_plugins === null || state().client_plugins === undefined}
        onChange={(v) => {
          if (!state().client_plugins && v) {
            // Just enable
            setSettings((settings) => (
              {
                ...settings,
                client_plugins: v,
              }
            ), true)

            return
          }

          openConfirmationModal({
            body: () => (
              <p>
              I know the big bold <b>"DON'T DISABLE THIS"</b> text makes it really tempting to disable, but you shouldn't. {appName} will have several vital systems removed,
              such as the <i>entire settings menu</i>.
                <br />
                <br />
              This option is intended only for debugging, development, and for running old versions of {appName} functionality on old versions of {appName}. If you're not doing that, don't touch this.
              </p>
            ),
            header: () => 'Are you ABSOLUTELY sure?',
            type: 'neutral',
            confirmText: 'Confirm',
          }).then(
            () => setSettings((settings) => (
              {
                ...settings,
                client_plugins: v,
              }
            ), true),
            () => { /* do nothing */ }
          )
        }}
        note={<><b>DO NOT DISABLE THIS OPTION.</b> If you do, vital functionality will be lost. Only touch this if you know what you're doing.</>}
      >
        Enable Dorion Plugins
      </SwitchItem>

      <Header class={classes.shead}>Blur & Transparency</Header>

      <Dropdown
        value={state().blur}
        selected={state().blur}
        onChange={(e) =>
          setSettings((settings) => (
            {
              ...settings,
              blur: e.target.value,
            }
          ), true)
        }
        options={blurOptions().map((b) => ({
          label: capitalize(b),
          value: b,
        }))}
      />

      <div class={classes.stext}>
        The blurring effect can be unreliable, semi-broken, and extremely slow, depending on what OS and version you are on. For more context, see <a href="https://github.com/tauri-apps/window-vibrancy#available-functions" target="_blank">the window-vibrancy crate</a>.
      </div>

      <SwitchItem
        value={state().blur_css}
        onChange={(v) =>
          setSettings((settings) => (
            {
              ...settings,
              blur_css: v,
            }
          ), true)
        }
        note="Enable this if you are not using a theme designed to take advantage of transparent windows."
        disabled={state().blur === 'none'}
      >
        Enable builtin background transparency CSS
      </SwitchItem>

      <div class={classes.pbuttons}>
        <Button
          onClick={clearWebCache}
          style={{ width: '100%', padding: '18px' }}
          grow={true}
        >
          Wipe all web-based data
        </Button>

        <Button
          onClick={clearCSSCache}
          style={{ width: '100%', padding: '18px' }}
          grow={true}
        >
          Clear CSS Cache
        </Button>
      </div>
    </>
  )
}
