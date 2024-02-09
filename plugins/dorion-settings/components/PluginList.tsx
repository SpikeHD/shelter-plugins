import { invoke } from '../../../api/api.js'
import { css, classes } from './PluginList.tsx.scss'
import { Card } from '../../../components/Card.jsx'

const {
  ui: { Switch, Text, injectCss },
  solid: { createSignal },
} = shelter

let injectedCss = false

const getPlugins = async () => {
  const plugins: DorionPluginList = await invoke('get_plugin_list')
  return plugins
}

interface Props {
  onChange: () => void
}

export function PluginList(props: Props) {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const [plugins, setPlugins] = createSignal<DorionPluginList>({})

  ;(async () => {
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
              Enabled
            </Text>
          </div>

          <div class={classes.scell}>
            <Text class={classes.left16}>
              Preload
            </Text>
          </div>
        </div>

        {Object.entries(plugins() as DorionPluginList).length === 0 && (
          <div class={classes.plistrow}>
            <Text class={classes.left16}>
              No plugins found
            </Text>
          </div>
        )}

        {Object.entries(plugins() as DorionPluginList).map(([filename, plugin]) => (
          <div key={filename} class={classes.plistrow}>
            <div class={classes.mcell}>
              <Text class={classes.left16}>{plugin.name}</Text>
            </div>

            <div class={classes.scell}>
              <Switch
                checked={plugin.enabled}
                onChange={() => {
                  props.onChange()

                  invoke('toggle_plugin', {
                    name: filename,
                  })

                  setPlugins(
                    {
                      ...plugins(),
                      [filename]: {
                        ...plugin,
                        enabled: !plugin.enabled,
                      },
                    }
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
                onChange={() => {
                  props.onChange()

                  invoke('toggle_preload', {
                    name: filename,
                  })

                  setPlugins(
                    {
                      ...plugins(),
                      [filename]: {
                        ...plugin,
                        preload: !plugin.preload,
                      },
                    }
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
