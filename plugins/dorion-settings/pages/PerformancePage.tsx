import { appName, backendRestartRequired, invoke } from '../../../api/api.js'
import { t } from '../../../util/i18n.js'
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
      title: t('dorion_performance.css_cache_cleared'),
      duration: 3000
    })
  }

  const clearWebCache = () => {
    openConfirmationModal({
      body: () => t('dorion_performance.clear_web_cache_warning'),
      header: () => t('common.confirm'),
      type: 'neutral',
      confirmText: t('common.confirm'),
    }).then(
      () => invoke('set_clear_cache'),
      () => {},
    )
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>{t('dorion_performance.title')}</Header>

      {restartRequired() && (
        <WarningCard />
      )}

      <Header class={classes.shead}>{t('dorion_performance.cache')}</Header>
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
        note={t('dorion_performance.cache_css_note')}
      >
        {t('dorion_performance.cache_css')}
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
        tooltipNote={platform() !== 'windows' && t('dorion_performance.windows_only')}
        note={t('dorion_performance.auto_clear_cache_note', { appName })}
      >
        {t('dorion_performance.auto_clear_cache')}
      </SwitchItem>

      <Header class={classes.shead}>{t('dorion_performance.optional_features')}</Header>
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
        note={t('dorion_performance.win7_notifications_note')}
        disabled={platform() !== 'windows'}
      >
        {t('dorion_performance.win7_notifications')}
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
            {t('dorion_performance.streamer_mode_detection_note')} <b>{t('dorion_performance.streamer_mode_detection_requirement')}</b>
          </>
        }
        disabled={!state().rpc_server}
      >
        {t('dorion_performance.streamer_mode_detection')}
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
        note={t('dorion_performance.disable_hardware_accel_note')}
        disabled={platform() === 'macos'}
      >
        {t('dorion_performance.disable_hardware_accel')}
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
                {t('dorion_performance.disable_plugins_warning', { appName })}
              </p>
            ),
            header: () => t('dorion_performance.absolutely_sure'),
            type: 'neutral',
            confirmText: t('common.confirm'),
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
        note={<><b>{t('dorion_performance.do_not_disable')}</b> {t('dorion_performance.disable_plugins_note')}</>}
      >
        {t('dorion_performance.enable_dorion_plugins')}
      </SwitchItem>

      <Header class={classes.shead}>{t('dorion_performance.blur_transparency')}</Header>

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
        {t('dorion_performance.blur_warning', {
          windowVibrancyLink: <a href="https://github.com/tauri-apps/window-vibrancy#available-functions" target="_blank">{t('dorion_performance.window_vibrancy_crate')}.</a>
        })}
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
        note={t('dorion_performance.blur_css_note')}
        disabled={state().blur === 'none'}
      >
        {t('dorion_performance.blur_css')}
      </SwitchItem>

      <div class={classes.pbuttons}>
        <Button
          onClick={clearWebCache}
          style={{ width: '100%', padding: '18px' }}
          grow={true}
        >
          {t('dorion_performance.wipe_web_data')}
        </Button>

        <Button
          onClick={clearCSSCache}
          style={{ width: '100%', padding: '18px' }}
          grow={true}
        >
          {t('dorion_performance.clear_css_cache')}
        </Button>
      </div>
    </>
  )
}
