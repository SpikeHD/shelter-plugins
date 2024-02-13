import { appName, backendRestartRequired, invoke } from '../../../api/api.js'
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
      backendRestartRequired
    }
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>{appName} Settings</Header>

      {restartRequired() && (
        <WarningCard />
      )}

      <Header class={classes.shead}>Client Type</Header>
      <RadioGroup 
        options={[
          {
            label: 'Default',
            value: 'default',
          },
          {
            label: 'PTB',
            value: 'ptb',
          },
          {
            label: 'Canary',
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

      <Header class={classes.shead}>Window</Header>
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
        note={`Instead of closing, ${appName} will run in the background and will be accessible via the system tray.`}
      >
        Minimize to System Tray
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
        Start Maximized
      </SwitchItem>

      <Header class={classes.shead}>Startup</Header>
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
        note={`Open ${appName} when your system starts.`}
      >
        Open on Startup
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
        note="Open in the background when your system starts."
      >
        Start Minimized
      </SwitchItem>

      <Header class={classes.shead}>Misc.</Header>
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
        note={`Allow multiple instances of ${appName} to be running at the same time.`}
      >
        Allow Multiple Instances
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
        note="Disable the custom titlebar and use your systems native one instead."
      >
        Use Native Titlebar
      </SwitchItem>

      <Header class={classes.shead}>Updates</Header>
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
            Automatically update various {appName} components, such as{' '}
            <a href="https://github.com/SpikeHD/shelter-plugins" target="_blank">
              SpikeHD/shelter-plugins
            </a>
            .
          </>
        }
      >
        Autoupdate
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
        Notify me of updates
      </SwitchItem>
    </>
  )
}
