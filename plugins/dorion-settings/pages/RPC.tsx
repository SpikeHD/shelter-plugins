import { appName, backendRestartRequired, invoke } from '../../../api/api.js'
import { css, classes } from './RPC.tsx.scss'
import { WarningCard } from '../components/WarningCard.jsx'
import { defaultConfig } from '../util/settings.js'

const {
  ui: {
    SwitchItem,
    Header,
    HeaderTags,
    injectCss,
  },
  solid: { createSignal, createEffect },
} = shelter

let injectedCss = false

export function RPCPage() {
  const [settings, setSettingsState] = createSignal<DorionSettings>(defaultConfig)
  const [restartRequired, setRestartRequired] = createSignal(false)

  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  createEffect(async () => {
    setSettingsState(JSON.parse(await invoke('read_config_file')))

    // @ts-expect-error cry about it
    setRestartRequired(window?.__DORION_RESTART__ === true)
  })

  const setSettings = (fn: (DorionSettings) => DorionSettings, requiresRestart?: boolean) => {
    setSettingsState(fn(settings()))

    // Save the settings
    invoke('write_config_file', {
      contents: JSON.stringify(fn(settings())),
    })

    // If a restart is now required, set that
    if (requiresRestart) {
      setRestartRequired(true)
      backendRestartRequired(true)
    }
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.bot16}>RPC Settings</Header>

      {restartRequired() && (
        <WarningCard />
      )}

      <Header class={classes.shead}>Server</Header>

      <SwitchItem
        value={settings().rpc_server}
        onChange={(v) =>
          setSettings((settings) => (
            {
              ...settings,
              rpc_server: v,
            }
          ), true)
        }
        tooltipNote="This is a work in progress, and won't do EVERYTHING arRPC does quite yet."
        note={
          <>
            Enable the integrated RPC server, eliminating the need for a separate arRPC server running.
            Pairs best with <a href="https://github.com/SpikeHD/shelter-plugins?tab=readme-ov-file#shelterpc" target="_blank">shelteRPC</a>, also works with <a href="https://github.com/OpenAsar/arRPC" target="_blank">arRPC</a>.
          </>
        }
      >
        Integrated rich presence server
      </SwitchItem>

      <Header class={classes.shead}>Advanced Settings</Header>

      <SwitchItem
        value={settings().rpc_process_scanner}
        onChange={(v) => {
          setSettings(p => {
            return { ...p, rpc_process_scanner: v, }
          }, true)
        }}
        disabled={!settings().rpc_server}
        note={`Enable this if you want ${appName} to scan for running processes. This is the most performance-heavy component of RPC.`}
      >
        Enable Process Scanner
      </SwitchItem>

      <SwitchItem
        value={settings().rpc_ipc_connector}
        onChange={(v) => {
          setSettings(p => {
            return { ...p, rpc_ipc_connector: v }
          }, true)
        }}
        disabled={!settings().rpc_server}
        note={
          <>
            Enable this if you want {appName} to connect to local sockets.
            Things such as the <a href="https://github.com/LeonardSSH/vscord">VSCord</a> extension use this method of connection.
          </>
        }
      >
        Enable IPC Connector
      </SwitchItem>

      <SwitchItem
        value={settings().rpc_websocket_connector}
        onChange={(v) => {
          setSettings(p => {
            return { ...p, rpc_websocket_connector: v }
          }, true)
        }}
        disabled={!settings().rpc_server}
        note={`Enable this if you want ${appName} to accept local websocket connections.`}
      >
        Enable Websocket Connector
      </SwitchItem>

      <SwitchItem
        value={settings().rpc_secondary_events}
        onChange={(v) => {
          setSettings((p) => {
            return { ...p, rpc_secondary_events: v }
          }, true)
        }}
        disabled={!settings().rpc_server}
        note={`Enable this to allow ${appName} to properly handle server invites opened in the browser. Does not work with arRPC.`}
      >
        Enable secondary events
      </SwitchItem>
    </>
  )
}
