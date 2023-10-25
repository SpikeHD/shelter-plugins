import { css, classes } from './PluginList.tsx.scss'
import { Card } from '../../../components/Card'

const {
  ui: { Switch, Text, injectCss },
  solid: { createSignal },
} = shelter

const { invoke } = (window as any).__TAURI__

let injectedCss = false

const getPlugins = async () => {
  const plugins: DorionPlugin[] = await invoke('get_plugin_list')
  return plugins
}

export function PluginList() {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const [plugins, setPlugins] = createSignal<DorionPlugin[]>([]);

  (async () => {
    setPlugins(await getPlugins())
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
              Plugin Name
            </Text>
          </div>

          <div class={classes.scell}>
            <Text class={classes.left16}>
              Enabled?
            </Text>
          </div>

          <div class={classes.scell}>
            <Text class={classes.left16}>
              Preload?
            </Text>
          </div>
        </div>

        {plugins().map((plugin) => (
          <div key={plugin.name} class={classes.plistrow}>
            <div class={classes.mcell}>
              <Text class={classes.left16}>{plugin.name}</Text>
            </div>

            <div class={classes.scell}>
              <Switch
                value={!plugin.disabled}
                onChange={(_v) => {
                  invoke('toggle_plugin', {
                    name: plugin.name,
                  })

                  setPlugins(
                    plugins().map((p) => {
                      if (p.name === plugin.name) {
                        p.disabled = !p.disabled
                      }

                      return p
                    })
                  )
                }}
                style={{
                  flexDirection: 'column-reverse',
                }}
              />
            </div>

            <div class={classes.scell}>
              <Switch
                checked={plugin.preload}
                onChange={(_v) => {
                  invoke('toggle_preload', {
                    name: plugin.name,
                  })

                  setPlugins(
                    plugins().map((p) => {
                      if (p.name === plugin.name) {
                        p.preload = !p.preload
                      }

                      return p
                    })
                  )
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
