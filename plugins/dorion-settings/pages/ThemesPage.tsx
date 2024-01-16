import { css, classes } from './PluginsPage.tsx.scss'
import { Card } from '../../../components/Card.jsx'
import { Dropdown } from '../../../components/Dropdown.jsx'
import { installThemeModal, loadTheme } from '../util/theme.jsx'

const { invoke } = (window as any).__TAURI__

const {
  ui: { Header, Button, HeaderTags, injectCss, Text },
  solid: { createSignal, createEffect },
} = shelter

let injectedCss = false

const getThemes = async () => {
  const themes: string[] = await invoke('get_theme_names')
  return themes.map((t: string) => ({
    label: t.replace(/"/g, '').replace('.css', '').replace('.theme', ''),
    value: t.replace(/"/g, ''),
  }))
}

export function ThemesPage() {
  const [settings, setSettingsState] = createSignal<DorionSettings>({
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
    multi_instance: false,
  })
  const [themes, setThemes] = createSignal<DorionTheme[]>([])

  createEffect(async () => {
    setSettingsState(JSON.parse(await invoke('read_config_file')))
    setThemes(await getThemes())
  })

  const setSettings = (fn: (DorionSettings) => DorionSettings) => {
    setSettingsState(fn(settings()))

    // Save the settings
    invoke('write_config_file', {
      contents: JSON.stringify(fn(settings())),
    })
  }

  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const openThemesFolder = () => {
    invoke('open_themes')
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>Themes</Header>

      <Card style={{ marginTop: '1rem' }}>
        <div class={classes.fcard}>
          <Text class={classes.left16}>Themes Folder</Text>
          <Button onClick={openThemesFolder}>Open</Button>
        </div>
      </Card>

      <Header class={classes.shead}>Theme</Header>
      <div class={classes.themeRow}>
        <Dropdown
          value={settings().theme}
          onChange={(e) => {
            setSettings(p => {
              return {
                ...p,
                theme: e.target.value,
              }
            })

            loadTheme(e.target.value)
          }}
          placeholder={'Select a theme...'}
          options={[{ label: 'None', value: 'none' }, ...themes()]}
          selected={settings().theme}
          style={'margin-right: 8px;'}
        />

        <Button
          onClick={() => {
            installThemeModal()
          }}
          style={{
            width: '200px',
            height: '40px'
          }}
        >
          Install from Link
        </Button>
      </div>
    </>
  )
}
