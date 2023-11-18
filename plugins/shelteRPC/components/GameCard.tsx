import { timestampToRelative } from '../util'
import { css, classes } from './GameCard.scss'

interface Props {
  name?: string
  manuallyAdded?: boolean
  lastPlayed?: number
  type: 'playing' | 'played' | 'none'
  local: boolean
}

const {
  ui: {
    injectCss
  },
  plugin: {
    store
  }
} = shelter

const trashIcon = () => (
  <svg class="icon_f09dde" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
    <path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
  </svg>
)

let injectedCss = false

const deleteGame = (name: string) => {
  // Remove from local detectables
  window.dorion && (window as any).__TAURI__.event.emit('remove_detectable', {
    name,
    exe: ''
  })

  // Also remove from the plugin store
  const key = Object.keys(store.previouslyPlayed).find(k => store.previouslyPlayed[k].name === name)
  delete store.previouslyPlayed[key]

  // If the currently playing game is the one we're deleting, set it to nothing
  if (store.currentlyPlaying === name) {
    store.currentlyPlaying = ''
  }
}

export default (props: Props) => {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  return (
    <div class={classes.gameCard + ' ' + (
      props.type === 'playing' && props.name ? classes.cardPlaying :
        props.type === 'played' ? classes.cardPlayed :
          classes.cardNone
    )}>
      <div class={classes.gameCardInfo}>
        <span class={classes.gameCardName}>{props.name || 'No game detected'}</span>
        <span class={classes.gameCardLastPlayed}>
          {
            props.type === 'played' ? <>Last played: <span class={classes.lastPlayedTimestamp}>{timestampToRelative(props.lastPlayed)}</span></> :
              props.type === 'playing' && props.name ? 'Now playing!' :
                'What are you playing?'
          }
        </span>
      </div>
      
      <div class={classes.gameCardIcons}>
        { props.local && <span class={classes.trash} onclick={() => {
          deleteGame(props.name || '')
        }}>{trashIcon()}</span> }
      </div>
    </div>
  )
}