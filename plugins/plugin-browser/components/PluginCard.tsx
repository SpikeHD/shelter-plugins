import { PluginData } from '../api.js'
import { css, classes } from './PluginCard.scss'

interface Props {
  plugin: PluginData
}

const {
  ui: {
    injectCss,
    Button,
    Text
  },
  solid: {
    createSignal,
    createEffect,
  },
  plugins: {
    installedPlugins,
    addRemotePlugin
  }
} = shelter

let injectedCss = false

export function PluginCard({ plugin }: Props) {
  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const [installed, setInstalled] = createSignal(false)

  createEffect(async () => {
    const installed = Object.values(installedPlugins?.() || {}).some((p: any) => p.manifest.name === plugin.name && p.manifest.author === plugin.author)
    setInstalled(installed)
  })

  const installPlugin = () => {
    addRemotePlugin(plugin.name, plugin.url, true)
    setInstalled(true)
  }

  return (
    <div class={classes.pluginCard}>
      <Text class={classes.name}>
        <b>{plugin.name}</b> by <b>{plugin.author}</b>
      </Text>

      <Text class={classes.contents}>{plugin.description}</Text>

      <div class={classes.buttonContainer}>
        <Button
          class={classes.installButton}
          onClick={installPlugin}
          disabled={installed() || !plugin.name}
        >
          {
            installed() ? 'Installed' : 'Install'
          }
        </Button>
      </div>
    </div>
  )
}
