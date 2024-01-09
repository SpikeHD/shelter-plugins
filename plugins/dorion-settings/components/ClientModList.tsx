import { css, classes } from './ClientModList.tsx.scss'
import { Card } from '../../../components/Card'

const {
  ui: { Switch, Text, injectCss },
  solid: { createSignal },
} = shelter
const { invoke } = (window as any).__TAURI__

let injectedCss = false

const getClientMods = async () => {
  const clientMods: string = await invoke('available_mods')
  console.log(clientMods)
  return clientMods
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

  return (
    <Card style={{ marginTop: '1rem' }}>
      <div class={classes.plist}>
        <div
          class={
            classes.pheader + ' ' + classes.plistrow
          }
        >
          <div class={classes.mcell}>
            <Text class={classes.left16}>
              Client Mod Name
            </Text>
          </div>

          <div class={classes.scell}>
            <Text class={classes.left16}>
              Enabled
            </Text>
          </div>
        </div>

        {clientMods().map((modName: string) => (
          <div key={modName} class={classes.plistrow}>
            <div class={classes.mcell}>
              <Text class={classes.left16}>{modName}</Text>
            </div>

            <div class={classes.scell}>
              <Switch
                disabled={modName === 'Shelter'}
                checked={settings().client_mods?.includes(modName) || false}
                onChange={() => onClientModToggle(modName)}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
