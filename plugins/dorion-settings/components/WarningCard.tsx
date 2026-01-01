import { process } from '../../../api/api.js'
import { t } from '../../../util/i18n.js'
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
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  return (
    <Card style={{ marginTop: '1rem' }} class={classes.restartCard}>
      <Text>
        {t('dorion_warning_card.restart_message')}
      </Text>
      <Button
        onClick={() => process.relaunch()}
        class={classes.restartButton}
        grow={true}
      >
        {t('common.restart')}
      </Button>
    </Card>
  )
}