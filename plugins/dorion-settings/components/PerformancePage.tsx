import { css, classes } from './PerformancePage.tsx.scss'

const {
  ui: { injectCss, SwitchItem, Button, Text, Header, HeaderTags },
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
  })

  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  createEffect(async () => {
    const settings = await invoke('read_config_file')
    const defaultConf = await invoke('default_config')

    try {
      setState(JSON.parse(settings))
    } catch (e) {
      setState(JSON.parse(defaultConf))
    }
  })

  const saveSettings = async () => {
    await invoke('write_config_file', {
      contents: JSON.stringify(state),
    })

    process.relaunch()
  }

  const clearCSSCache = async () => {
    await invoke('clear_css_cache')
    showToast('Cleared CSS cache')
  }

  const clearWebCache = async () => {
    Alerts.show({
      title: 'Are you sure?',
      body: (
        <>
          <p>
            Clearing web cache will log you out and reset your Vencord settings
            (unless they are on the cloud, of course), but can often help solve
            permission-based issues.
          </p>
          <p>Do you want to proceed?</p>
        </>
      ),
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm: () => invoke('set_clear_cache'),
    })
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
        note="Enable the integrated RPC server, eliminating the need for a separate arRPC server running. Remember to enable the arRPC plugin!"
      >
        Integrated rich presence server
      </SwitchItem>

      <div class={classes.pbuttons}>
        <Button
          onClick={saveSettings}
          class={classes.pbutton}
        >
          Save and Restart
        </Button>

        <Button
          onClick={clearWebCache}
          class={classes.pbutton}
        >
          Clear WebData Cache
        </Button>

        <Button
          onClick={clearCSSCache}
          class={classes.pbutton}
        >
          Clear CSS Cache
        </Button>
      </div>
    </>
  )
}
