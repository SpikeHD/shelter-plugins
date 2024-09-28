import { app, invoke } from '../../../api/api.js'
import { css, classes } from './ThemesPage.tsx.scss'
import { deprecated_loadTheme, installThemeModal, reloadThemes } from '../util/theme.jsx'
import { Dropdown } from '../../../components/Dropdown.jsx'
import { defaultConfig } from '../util/settings.js'

const {
  ui: { Header, Button, HeaderTags, injectCss, Divider, ButtonSizes },
  solid: { createSignal, createEffect },
} = shelter

let injectedCss = false

function asMmp(v: string) {
  const noLetters = v.replace(/[a-zA-Z]/g, '')
  const split = noLetters.split('.')

  return {
    major: parseInt(split[0], 10),
    minor: parseInt(split[1], 10),
    patch: parseInt(split[2], 10),
  }
}

export function ThemesPage() {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const [settings, setSettingsState] = createSignal<DorionSettings>(defaultConfig)
  const [themes, setThemes] = createSignal<DorionTheme[]>([])
  const [supportsMultiTheme, setSupportsMultiTheme] = createSignal()

  const getThemes = async () => {
    const themes: string[] = await invoke('get_theme_names')
    return themes.map((t: string) => ({
      label: t.replace(/"/g, '').replace('.css', '').replace('.theme', ''),
      value: t.replace(/"/g, ''),
    }))
  }

  createEffect(async () => {
    const version = asMmp(await app.getVersion())
    setSettingsState(JSON.parse(await invoke('read_config_file')))
    setThemes(await getThemes())

    // I will be removing this at some point. Prepare thyselves, non-autoupdaters
    setSupportsMultiTheme(version.major >= 6 && version.minor >= 1)
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

  // FIXME remove the compat stuff at some point
  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>Themes</Header>

      <Header class={classes.shead}>Theme</Header>

      {
        supportsMultiTheme() ? (
          <>
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
                  placeholder={'Select a theme...'}
                  options={[{ label: 'None', value: 'none' }, ...themes()]}
                />
              )
              )
            }

            <Dropdown
              style={'margin-bottom: 8px;'}
              value={'none'}
              onChange={(e) => {
                appendTheme('none', e.target.value)
                reloadThemes()
              }}
              placeholder={'Select a theme...'}
              options={[{ label: 'None', value: 'none' }, ...themes()]}
              immutable={true}
            />
          </>
        ) : (
          <Dropdown
            value={settings().theme}
            onChange={(e) => {
              setSettings(p => {
                return {
                  ...p,
                  theme: e.target.value,
                }
              })
    
              deprecated_loadTheme(e.target.value)
            }}
            placeholder={'Select a theme...'}
            options={[{ label: 'None', value: 'none' }, ...themes()]}
            selected={settings().theme}
          />
        )
      }

      <Divider mt={16} mb={16} />

      <div class={classes.pbuttons}>
        {
          // FIXME remove the disabled bit at some point
        }
        <Button size={ButtonSizes.MEDIUM} onClick={installThemeModal} disabled={!supportsMultiTheme()}>Install Theme From Link</Button>
        <Button size={ButtonSizes.MEDIUM} onClick={openThemesFolder}>Open Themes Folder</Button>
      </div>
    </>
  )
}
