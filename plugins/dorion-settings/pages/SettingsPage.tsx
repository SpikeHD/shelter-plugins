import { appName, backendRestartRequired, invoke } from '../../../api/api.js'
import { t } from '../../../util/i18n.js'
import { css, classes } from './SettingsPage.tsx.scss'
import { WarningCard } from '../components/WarningCard.jsx'
import { RadioGroup } from '../../../components/RadioGroup.jsx'
import { defaultConfig } from '../util/settings.js'

const {
  ui: {
    SwitchItem,
    Header,
    HeaderTags,
    Slider,
    injectCss,
  },
  solid: { createSignal, createEffect },
} = shelter

let injectedCss = false

export function SettingsPage() {
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
      <Header tag={HeaderTags.H1} class={classes.tophead}>{t('dorion_settings.title').replace('{{appName}}', appName)}</Header>

      {restartRequired() && (
        <WarningCard />
      )}

      <Header class={classes.shead}>{t('dorion_settings.client_type')}</Header>
      <RadioGroup 
        options={[
          {
            label: t('dorion_settings.client_type_default'),
            value: 'default',
          },
          {
            label: t('dorion_settings.client_type_ptb'),
            value: 'ptb',
          },
          {
            label: t('dorion_settings.client_type_canary'),
            value: 'canary',
          },
        ]}
        onChange={(e) => {
          setSettings(
            p => {
              return {
                ...p,
                client_type: e,
              }
            },
            true
          )
        }}
        selected={settings().client_type} 
      />

      <Header class={classes.shead}>{t('dorion_settings.window')}</Header>
      <Header tag={HeaderTags.H4} style="" class={classes.ohead}>{t('dorion_settings.zoom_level')}</Header>
      <Slider
        min={50}
        max={125}
        steps={
          Array.from(Array(16).keys()).map(i => (i * 5 + 50) + '%')
        }
        step={5}
        value={parseFloat(settings().zoom) * 100}
        onInput={(v) => {
          setSettings(p => {
            return {
              ...p,
              zoom: (parseFloat(v) / 100).toString(),
            }
          })

          invoke('window_zoom_level', {
            value: parseFloat(v) / 100,
          })
        }}
      />
      <SwitchItem
        value={settings().sys_tray}
        onChange={(v) => {
          setSettings(
            p => {
              return {
                ...p,
                sys_tray: v,
              }
            },
            true
          )
        }}
        note={t('dorion_settings.sys_tray_note').replace('{{appName}}', appName)}
      >
        {t('dorion_settings.sys_tray')}
      </SwitchItem>

      <SwitchItem
        value={settings().start_maximized}
        onChange={(v) => {
          setSettings(p => {
            return {
              ...p,
              start_maximized: v,
            }
          })
        }}
      >
        {t('dorion_settings.start_maximized')}
      </SwitchItem>

      <Header class={classes.shead}>{t('dorion_settings.startup')}</Header>
      <SwitchItem
        value={settings().open_on_startup}
        onChange={(v) => {
          setSettings(p => {
            return {
              ...p,
              open_on_startup: v,
              startup_minimized: v ? p.startup_minimized : false,
            }
          })
        }}
        note={t('dorion_settings.open_on_startup_note').replace('{{appName}}', appName)}
      >
        {t('dorion_settings.open_on_startup')}
      </SwitchItem>

      <SwitchItem
        value={settings().startup_minimized}
        disabled={!settings().open_on_startup}
        onChange={(v) => {
          setSettings(p => {
            return {
              ...p,
              startup_minimized: v,
            }
          })
        }}
        note={t('dorion_settings.start_minimized_note')}
      >
        {t('dorion_settings.start_minimized')}
      </SwitchItem>

      <Header class={classes.shead}>{t('dorion_settings.misc')}</Header>
      <SwitchItem
        value={settings().multi_instance}
        onChange={(v) => {
          setSettings(
            p => {
              return {
                ...p,
                multi_instance: v,
              }
            },
            true
          )
        }}
        note={t('dorion_settings.multi_instance_note').replace('{{appName}}', appName)}
      >
        {t('dorion_settings.multi_instance')}
      </SwitchItem>

      <SwitchItem
        value={settings().use_native_titlebar}
        onChange={(v) => {
          setSettings(
            p => {
              return {
                ...p,
                use_native_titlebar: v,
              }
            },
            true
          )
        }}
        note={t('dorion_settings.use_native_titlebar_note')}
      >
        {t('dorion_settings.use_native_titlebar')}
      </SwitchItem>

      <Header class={classes.shead}>{t('dorion_settings.updates')}</Header>
      <SwitchItem
        value={settings().autoupdate}
        onChange={(v) => {
          setSettings(p => {
            return {
              ...p,
              autoupdate: v,
              update_notify: v ? p.update_notify : false,
            }
          })
        }}
        note={
          <>
            {t('dorion_settings.autoupdate_note').replace('{{appName}}', appName)}
            {' '}
            <a href="https://github.com/SpikeHD/shelter-plugins" target="_blank">
              SpikeHD/shelter-plugins
            </a>
            .
          </>
        }
      >
        {t('dorion_settings.autoupdate')}
      </SwitchItem>

      <SwitchItem
        value={
          settings().update_notify === undefined || settings().update_notify
        }
        onChange={(v) => {
          setSettings(p => {
            return {
              ...p,
              update_notify: v,
            }
          })
        }}
        disabled={settings().autoupdate}
      >
        {t('dorion_settings.update_notify')}
      </SwitchItem>
    </>
  )
}
