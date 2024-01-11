import { getPluginJson } from '../github.js'
import { css, classes } from './PluginCard.scss'

interface Props {
  plugin: string
  site: string
  author: string
  install_url: string
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

export function PluginCard(props: Props) {
  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const [info, setInfo] = createSignal({})
  const [installed, setInstalled] = createSignal(false)

  createEffect(async () => {
    setInfo(await getPluginJson(props.site, props.plugin))

    const installed = Object.values(installedPlugins?.() || {}).some((p: any) => p.manifest.name === info()?.name && p.manifest.author === info()?.author)
    setInstalled(installed)
  })

  const installPlugin = () => {
    addRemotePlugin(props.plugin, props.install_url, true)
    setInstalled(true)
  }

  return (
    <div class={classes.pluginCard}>
      <Text class={classes.name}>
        <b>{info()?.name || 'Unknown'}</b> by <b>{props.author}</b>
      </Text>

      <Text>{info()?.description}</Text>

      <div class={classes.installButton}>
        <Button
          class={classes.installButton}
          onClick={installPlugin}
          disabled={installed() || !info()?.name}
        >
          {
            installed() ? 'Already Installed!' : 'Install'
          }
        </Button>
      </div>
    </div>
  )
}