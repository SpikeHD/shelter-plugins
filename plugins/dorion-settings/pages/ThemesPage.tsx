import { invoke } from '../../../api/api.js'
import { css, classes } from './ThemesPage.tsx.scss'
import { installThemeModal, loadTheme } from '../util/theme.jsx'
import { Dropdown } from '../../../components/Dropdown.jsx'
import { defaultConfig } from '../util/settings.js'

const {
  ui: { Header, Button, HeaderTags, injectCss, Divider, ButtonSizes },
  solid: { createSignal, createEffect },
} = shelter

let injectedCss = false

export function ThemesPage() {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const [settings, setSettingsState] = createSignal<DorionSettings>(defaultConfig)
  const [themes, setThemes] = createSignal<DorionTheme[]>([])

  const getThemes = async () => {
    const themes: string[] = await invoke('get_theme_names')
    return themes.map((t: string) => ({
      label: t.replace(/"/g, '').replace('.css', '').replace('.theme', ''),
      value: t.replace(/"/g, ''),
    }))
  }

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

  const openThemesFolder = () => {
    invoke('open_themes')
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>Themes</Header>

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

          loadTheme(e.target.value)
        }}
        placeholder={'Select a theme...'}
        options={[{ label: 'None', value: 'none' }, ...themes()]}
        selected={settings().theme}
      />

      <Divider mt={16} mb={16} />

      <div class={classes.pbuttons}>
        <Button size={ButtonSizes.MEDIUM} onClick={installThemeModal}>Install Theme From Link</Button>
        <Button size={ButtonSizes.MEDIUM} onClick={openThemesFolder}>Open Themes Folder</Button>
      </div>
    </>
  )
}
