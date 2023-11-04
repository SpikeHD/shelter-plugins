import { timestampToRelative } from '../util'
import { css, classes } from './GameCard.scss'

interface Props {
  name?: string
  manuallyAdded?: boolean
  lastPlayed?: number
  type: 'playing' | 'played' | 'none'
}

const {
  ui: {
    injectCss
  },
} = shelter

let injectedCss = false

export default (props: Props) => {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  return (
    <div class={classes.gameCard + ' ' + (
      props.type === 'playing' ? classes.cardPlaying :
        props.type === 'played' ? classes.cardPlayed :
          classes.cardNone
    )}>
      <div class={classes.gameCardInfo}>
        <span class={classes.gameCardName}>{props.name || 'No game detected'}</span>
        <span class={classes.gameCardLastPlayed}>
          {
            props.type === 'played' ? <>Last played: <span class={classes.lastPlayedTimestamp}>{timestampToRelative(props.lastPlayed)}</span></> :
              props.type === 'playing' ? 'Now playing!' :
                'What are you playing?'
          }
        </span>
      </div>
      { /* TODO: This will just be empty for now */ }
      <div></div>
    </div>
  )
}