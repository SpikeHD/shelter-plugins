import { invoke } from '../../../api/api.js'
import { reloadThemes } from '../../../util/theme.js'
import { Dropdown } from '../../../components/Dropdown.jsx'
import { css, classes } from './ThemesPage.tsx.scss'
import { installThemeModal } from '../util/theme.jsx'
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
    const settings = JSON.parse(await invoke('read_config_file'))

    if (!settings.themes) {
      settings.themes = []
    }

    setSettingsState(settings)
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

  const appendTheme = async (last: string, theme: string) => {
    if (!theme) return

    if (theme === '' || theme === 'none') {
      // Remove the previous entry this used to be
      setSettings(p => {
        return {
          ...p,
          themes: p.themes.filter(t => t !== last),
        }
      })

      return
    }

    // Add the new entry, remove the last
    setSettings(p => {
      return {
        ...p,
        themes: [...p.themes.filter(t => t !== last && t !== theme), theme],
      }
    })
  }
  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>Themes</Header>

      <Header class={classes.shead}>Theme</Header>

      {
        settings().themes.map((theme) => (
          <Dropdown
            style={'margin-bottom: 8px;'}
            key={theme}
            value={theme}
            onChange={(e) => {
              appendTheme(theme, e.target.value)
              reloadThemes()
            }}
            options={[{ label: 'None', value: 'none' }, ...themes()]}
          />
        )
        )
      }

      <Dropdown
        style={'margin-bottom: 8px;'}
        value={''}
        onChange={(e) => {
          appendTheme('none', e.target.value)
          reloadThemes()
        }}
        placeholder={'Select a theme...'}
        options={[...themes()]}
        immutable={true}
      />

      <Divider mt={16} mb={16} />

      <div class={classes.pbuttons}>
        <Button size={ButtonSizes.MEDIUM} onClick={() => installThemeModal((theme: string) => appendTheme('', theme))}>Install Theme From Link</Button>
        <Button size={ButtonSizes.MEDIUM} onClick={openThemesFolder}>Open Themes Folder</Button>
      </div>
    </>
  )
}
