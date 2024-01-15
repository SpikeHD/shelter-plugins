import { Card } from '../../../components/Card.jsx'
import { css, classes } from './WarningCard.tsx.scss'

const {
  ui: {
    injectCss,
    Text,
    Button
  }
} = shelter

let injectedCss = false

export function WarningCard() {
  const { process } = (window as any).__TAURI__

  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  return (
    <Card style={{ marginTop: '1rem' }} class={classes.restartCard}>
      <Text>
        One or more settings have been changed that require a restart to take effect.
      </Text>
      <Button
        onClick={() => process.relaunch()}
        class={classes.restartButton}
        grow={true}
      >
        Restart
      </Button>
    </Card>
  )
}