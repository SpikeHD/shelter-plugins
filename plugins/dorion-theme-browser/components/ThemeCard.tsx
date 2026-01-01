import { installAndLoad } from '../../../util/theme.js'
import { basicModal } from '../../../util/modal.jsx'
import { t } from '../../../util/i18n.js'

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
    Text,
    openModal,
  },
  solid: {
    createSignal,
    createEffect,
  }
} = shelter

let injectedCss = false

export function ThemeCard(props: Props) {
  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  console.log(props)

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
            onClick={() => themeInstallationModel(props.install_url, props.theme)}
          >
            {t('dorion_theme_card.install')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export const themeInstallationModel = async (link: string, name: string) => {
  const [status, setStatus] = createSignal<string>('')
  const [closeFn, setCloseFn] = createSignal<() => void>(() => {})

  createEffect(async () => {
    await installAndLoad(link, (s) => {
      setStatus(s)
      console.log(s)
    }, name).catch(e => {
      setStatus(e)
    })

    closeFn()
  })

  openModal((props) => {
    setCloseFn(props.close)

    return basicModal({
      header: t('dorion_theme_card.install'),
      body: (
        <div>
          <div style={{
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            height: '24px',
          }}>
            <Text>{status()}</Text>
          </div>
        </div>
      ),
    })
  })
}