import { appName, backendRestartRequired, invoke } from '../../../api/api.js'
import { t } from '../../../util/i18n.js'
import { css, classes } from './RPC.tsx.scss'
import { WarningCard } from '../components/WarningCard.jsx'
import { defaultConfig } from '../util/settings.js'

const {
  ui: {
    Button,
    Text,
    SwitchItem,
    Header,
    HeaderTags,
    injectCss,
    showToast,
  },
  solid: { createSignal, createEffect },
} = shelter

let injectedCss = false

export function RPCPage() {
  const [settings, setSettingsState] = createSignal<DorionSettings>(defaultConfig)
  const [shelteRPCInstalled, setShelteRPCInstalled] = createSignal(false)
  const [restartRequired, setRestartRequired] = createSignal(false)

  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  createEffect(async () => {
    setSettingsState(JSON.parse(await invoke('read_config_file')))
    setShelteRPCInstalled(Object.keys(shelter.plugins.installedPlugins()).includes('shelteRPC'))

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

  const tryInstallShelteRPC = async () => {
    await shelter.plugins.addRemotePlugin('shelteRPC', 'https://spikehd.dev/shelter-plugins/shelteRPC/', true).catch(e => {
      showToast({
        title: t('dorion_rpc.title'),
        content: t('dorion_rpc.error_installing'),
        duration: 3000,
      })

      throw e
    })

    shelter.plugins.startPlugin('shelteRPC')

    showToast({
      title: t('dorion_rpc.title'),
      content: t('dorion_rpc.successfully_installed'),
      duration: 3000,
    })
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.bot16}>{t('dorion_rpc.title')}</Header>

      {restartRequired() && (
        <WarningCard />
      )}

      <Header class={classes.shead}>{t('dorion_rpc.plugin')}</Header>
      <Button
        onClick={tryInstallShelteRPC}
        class={classes.customInstallBtn}
        disabled={shelteRPCInstalled()}
      >
        {t('dorion_rpc.install_shelterpc')}
      </Button>
      <Text
        class={classes.customNote}
      >
        {shelteRPCInstalled() && (
          <>
            <b>{t('dorion_rpc.already_installed')}</b>
            <br />
            <br />
          </>
        )}
        {t('dorion_rpc.install_note')}
      </Text>

      <Header class={classes.shead}>{t('dorion_rpc.server')}</Header>

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
        tooltipNote={t('dorion_rpc.work_in_progress')}
        note={
          <>
            {t('dorion_rpc.integrated_server_note')}
            {' '}<a href="https://github.com/SpikeHD/shelter-plugins?tab=readme-ov-file#shelterpc" target="_blank">shelteRPC</a>, {t('dorion_rpc.also_works_with')} <a href="https://github.com/OpenAsar/arRPC" target="_blank">arRPC</a>.
          </>
        }
      >
        {t('dorion_rpc.integrated_server')}
      </SwitchItem>

      <Header class={classes.shead}>{t('dorion_rpc.advanced_settings')}</Header>

      <SwitchItem
        value={settings().rpc_process_scanner}
        onChange={(v) => {
          setSettings(p => {
            return { ...p, rpc_process_scanner: v, }
          }, true)
        }}
        disabled={!settings().rpc_server}
        note={t('dorion_rpc.process_scanner_note').replace('{{appName}}', appName)}
      >
        {t('dorion_rpc.enable_process_scanner')}
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
            {t('dorion_rpc.ipc_connector_note').replace('{{appName}}', appName)}
            {' '}<a href="https://github.com/LeonardSSH/vscord" target="_blank">VSCord</a> {t('dorion_rpc.extension_connection')}.
          </>
        }
      >
        {t('dorion_rpc.enable_ipc_connector')}
      </SwitchItem>

      <SwitchItem
        value={settings().rpc_websocket_connector}
        onChange={(v) => {
          setSettings(p => {
            return { ...p, rpc_websocket_connector: v }
          }, true)
        }}
        disabled={!settings().rpc_server}
        note={t('dorion_rpc.websocket_connector_note').replace('{{appName}}', appName)}
      >
        {t('dorion_rpc.enable_websocket_connector')}
      </SwitchItem>

      <SwitchItem
        value={settings().rpc_secondary_events}
        onChange={(v) => {
          setSettings((p) => {
            return { ...p, rpc_secondary_events: v }
          }, true)
        }}
        disabled={!settings().rpc_server}
        note={t('dorion_rpc.secondary_events_note').replace('{{appName}}', appName)}
      >
        {t('dorion_rpc.enable_secondary_events')}
      </SwitchItem>
    </>
  )
}
