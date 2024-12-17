import { css, classes } from './ThemeCard.tsx.scss'

interface Props {
  key: string
  theme: string
  thumbnail: string
  likes: string
  downloads: string
  description: string
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
} = shelter

let injectedCss = false

export function ThemeCard(props: Props) {
  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const installTheme = () => {
    // TODO
  }

  return (
    <div class={classes.themeCard}>
      <div class={classes.thumbnail} style={`background-image: url(${props.thumbnail})`}></div>

      <div class={classes.info}>
        <Text class={classes.name}>
          <b>{props.theme}</b> by <b>{props.author}</b>
        </Text>

        <Text class={classes.contents}>{props.description}</Text>

        <div class={classes.buttonContainer}>
          <Button
            class={classes.installButton}
            onClick={installTheme}
          >
            Install
          </Button>
        </div>
      </div>
    </div>
  )
}