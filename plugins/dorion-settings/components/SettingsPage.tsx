import { Card } from '../../../components/Card'
import { Dropdown } from '../../../components/Dropdown'
import { Slider } from '../../../components/Slider'
import { PluginList } from './PluginList'

import { css, classes } from './SettingsPage.tsx.scss'

const {
  ui: {
    SwitchItem,
    Button,
    Text,
    Header,
    HeaderTags,
    injectCss,
  },
  solid: { createSignal, createEffect },
} = shelter

const { invoke, process } = (window as any).__TAURI__

let injectedCss = false
const fetched = false

const getThemes = async () => {
  const themes: string[] = await invoke('get_theme_names')
  return themes.map((t: string) => ({
    label: t.replace(/"/g, '').replace('.css', '').replace('.theme', ''),
    value: t.replace(/"/g, ''),
  }))
}

const openPluginsFolder = () => {
  invoke('open_plugins')
}

const openThemesFolder = () => {
  invoke('open_themes')
}

export function SettingsPage() {
  const [settings, setSettings] = createSignal<DorionSettings>({
    zoom: '1.0',
    client_type: 'default',
    sys_tray: false,
    push_to_talk: false,
    push_to_talk_keys: [],
    theme: 'none',
    use_native_titlebar: false,
    start_maximized: false,
    open_on_startup: false,
    startup_minimized: false,
    autoupdate: false,
    update_notify: true,
  })
  const [themes, setThemes] = createSignal<DorionTheme[]>([])

  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  createEffect(async () => {
    setSettings(JSON.parse(await invoke('read_config_file')))
    setThemes(await getThemes())
  })

  const saveSettings = async () => {
    await invoke('write_config_file', {
      contents: JSON.stringify(settings),
    })

    process.relaunch()
  }

  return (
    <>
      <Header tag={HeaderTags.H1}>Dorion Settings</Header>

      <Header class={classes.shead}>Theme</Header>
      <Dropdown
        value={settings().theme}
        onChange={(e) => {
          setSettings(p => {
            return {
              ...p,
              theme: e.target.value,
            }
          })
        }}
        options={['none', ...themes()]}
        selected={settings().theme}
      />

      <Header class={classes.shead}>Client Type</Header>
      <Dropdown
        options={[
          {
            label: 'Default',
            value: 'default',
          },
          {
            label: 'Canary',
            value: 'canary',
          },
          {
            label: 'PTB',
            value: 'ptb',
          },
        ]}
        placeholder={'Select a client type...'}
        maxVisibleItems={5}
        closeOnSelect={true}
        onChange={(e) => {
          setSettings(p => {
            return {
              ...p,
              client_type: e.target.value,
            }
          })
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
        value={parseInt(settings().zoom) * 100}
      />
      <SwitchItem
        value={settings().sys_tray}
        onChange={(v) => {
          setSettings(p => {
            return {
              ...p,
              sys_tray: v,
            }
          })
        }}
        note="Instead of closing, Dorion will run in the background and will be accessible via the system tray."
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
            }
          })
        }}
        note="Open Dorion when your system starts."
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
        value={settings().use_native_titlebar}
        onChange={(v) => {
          setSettings(p => {
            return {
              ...p,
              use_native_titlebar: v,
            }
          })
        }}
        note="Disable the custom titlebar and use your systems native one instead."
      >
        Use Native Titlebar
      </SwitchItem>

      <SwitchItem
        value={settings().autoupdate}
        onChange={(v) => {
          setSettings(p => {
            return {
              ...p,
              autoupdate: v,
            }
          })
        }}
        note={
          <>
            Automatically update various Dorion components, such as{' '}
            <a href="https://github.com/SpikeHD/Vencordorion" target="_blank">
              Vencordorion
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

      <Card style={{ marginTop: '1rem' }}>
        <div class={classes.fcard}>
          <Text class={classes.left16}>Plugins Folder</Text>
          <Button onClick={openPluginsFolder}>Open</Button>
        </div>
        <div class={classes.fcard}>
          <Text class={classes.left16}>Themes Folder</Text>
          <Button onClick={openThemesFolder}>Open</Button>
        </div>
      </Card>

      <Header class={classes.shead}>Plugins</Header>
      <PluginList />

      <Button
        onClick={saveSettings}
        style={{ 'margin-top': '1rem', padding: '8px' }}
        grow={true}
      >
        Save & Restart
      </Button>
    </>
  )
}
