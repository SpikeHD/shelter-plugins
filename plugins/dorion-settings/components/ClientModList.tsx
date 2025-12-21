import { invoke } from '../../../api/api.js'
import { css, classes } from './ClientModList.tsx.scss'
import { Card } from '../../../components/Card.jsx'

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

    console.log(settings())
  })()

  function onClientModToggle(modName: string) {
    const newClientMods = [...settings().client_mods]

    if (newClientMods.includes(modName)) {
      newClientMods.splice(newClientMods.indexOf(modName), 1)
    } else {
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

  return <Card style={{ marginTop: '1rem' }}>
    <div class={classes.plist}>
      {clientMods().length === 0 && (
        <div class={classes.plistrow}>
          <Text class={classes.left16}>
            Client mods not available. Please update
          </Text>
        </div>
      )}

      {clientMods().map((modName: string) => (
        <SwitchItem
          disabled={modName === 'Shelter'}
          value={settings().client_mods?.includes(modName) || false}
          onChange={() =>
            onClientModToggle(modName)
          }
        >
          {modName}
        </SwitchItem>
      ))}
    </div>
  </Card>
}
