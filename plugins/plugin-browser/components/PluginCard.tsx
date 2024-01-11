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
  },
  solid: {
    createSignal,
    createEffect,
  }
} = shelter

let injectedCss = false

export function PluginCard(props: Props) {
  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const [info, setInfo] = createSignal({})

  createEffect(async () => {
    setInfo(await getPluginJson(props.site, props.plugin))
  })

  const installPlugin = () => {
    // TODO
  }

  return (
    <div class={classes.pluginCard}>
      <div class={classes.name}>{info.name} by {props.author}</div>
      <div class={classes.description}>{info.description}</div>
      <div class={classes.installButton}>
        <Button
          class={classes.installButton}
          onClick={installPlugin}
        >
          Install
        </Button>
      </div>
    </div>
  )
}