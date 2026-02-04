import { invoke } from '../../../api/api.js'
import { css, classes } from './ClientModList.tsx.scss'

const {
  ui: { SwitchItem, Text, injectCss },
  solid: { createSignal },
} = shelter

let injectedCss = false

const getClientMods = async (): Promise<string> => {
  try  {
    return await invoke('available_mods')
  // eslint-disable-next-line
  } catch (e) {
    // function doesn't exist, version is too old
  }
}

interface Props {
  onChange: () => void
}

export function ClientModList(props: Props) {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

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
    client_mods: [],
  })

  const [clientMods, setClientMods] = createSignal<string[]>([])

  ;(async () => {
    setSettingsState(JSON.parse(await invoke('read_config_file')))
    setClientMods(await getClientMods())
  })()

  function onClientModToggle(modName: string) {
    const newClientMods = [...settings().client_mods]

    if (newClientMods.includes(modName)) {
      newClientMods.splice(newClientMods.indexOf(modName), 1)
    } else {
      // vencord and equicord are mutually exclusive
      if (modName === 'Vencord' && newClientMods.includes('Equicord')) {
        newClientMods.splice(newClientMods.indexOf('Equicord'), 1)
      } else if (modName === 'Equicord' && newClientMods.includes('Vencord')) {
        newClientMods.splice(newClientMods.indexOf('Vencord'), 1)
      }

      newClientMods.push(modName)
    }

    setSettings((s) => ({ ...s, client_mods: newClientMods }))

    props.onChange()
  }

  const setSettings = (fn: (DorionSettings) => DorionSettings) => {
    setSettingsState(fn(settings()))

    // Save the settings
    invoke('write_config_file', {
      contents: JSON.stringify(fn(settings())),
    })
  }

  return <>
    {clientMods().length === 0 && (
      <Text class={classes.left16}>
        Client mods not available. Please update.
      </Text>
    )}

    {clientMods().map((modName: string) => {
      const isVencordOrEquicord = modName === 'Vencord' || modName === 'Equicord'
      const isMutuallyExcluded = isVencordOrEquicord && (
        (modName === 'Vencord' && settings().client_mods?.includes('Equicord')) ||
        (modName === 'Equicord' && settings().client_mods?.includes('Vencord'))
      )

      let note = ''

      if (modName === 'Shelter') {
        note = 'Shelter is required for Dorion to function properly.'
      }

      return (
        <SwitchItem
          disabled={modName === 'Shelter' || isMutuallyExcluded}
          value={settings().client_mods?.includes(modName) || false}
          onChange={() =>
            onClientModToggle(modName)
          }
          note={note}
        >
          Enable {modName}
        </SwitchItem>
      )
    })}
  </>
}
