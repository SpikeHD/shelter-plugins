import { css, classes } from './ClientModList.tsx.scss'
import { Card } from '../../../components/Card'

const {
  ui: { Switch, Text, injectCss },
  solid: { createSignal },
} = shelter
const { invoke } = (window as any).__TAURI__

let injectedCss = false

const getClientMods = async () => {
  const clientMods: DorionClientMod[] = JSON.parse(await invoke('read_client_mods_file'))
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

  const [clientMods, setClientMods] = createSignal<DorionClientMod[]>([])

  ;(async () => {
    setClientMods(await getClientMods())
  })()

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
              Name
            </Text>
          </div>

          <div class={classes.scell}>
            <Text class={classes.left16}>
              Enabled
            </Text>
          </div>
        </div>

        {clientMods().map((clientMod: DorionClientMod) => (
          <div key={clientMod.name} class={classes.plistrow}>
            <div class={classes.mcell}>
              <Text class={classes.left16}>{clientMod.name}</Text>
            </div>

            <div class={classes.scell}>
              <Switch
                disabled={clientMod.name === 'Shelter'}
                checked={clientMod.enabled}
                onChange={() => {
                  props.onChange()

                  const newClientMods = [
                    ...clientMods().filter((c) => c.name !== clientMod.name),
                    {
                      ...clientMod,
                      enabled: !clientMod.enabled,
                    },
                  ]

                  invoke('write_client_mods_file', {
                    contents: JSON.stringify(newClientMods),
                  })

                  setClientMods(newClientMods)
                }}
                style={{
                  flexDirection: 'column-reverse',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
