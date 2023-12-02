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
  },
  solid: {
    createSignal
  }
} = shelter

const trashIcon = () => (
  <svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
    <path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
  </svg>
)

// https://iconmonstr.com/eye-9-svg/
const hideIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
  </svg>
)

// https://iconmonstr.com/eye-10-svg/
const hideClosed = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"/>
  </svg>
)

let injectedCss = false

const deleteGame = (name: string) => {
  // Remove from local detectables
  (window as any).dorion && (window as any).__TAURI__.event.emit('remove_detectable', {
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

  const [hide, setHide] = createSignal(props.name ? store.previouslyPlayed[props.name]?.hide : false)

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

        { (props.name && props.type !== 'playing') && <span class={classes.hide} onclick={() => {
          if (!props.name) return

          // Toggle hiding the game via store.previouslyPlayed
          const key = Object.keys(store.previouslyPlayed).find(k => store.previouslyPlayed[k].name === props.name)
          store.previouslyPlayed[key].hide = !hide()

          setHide(!hide())
        }}>
          { hide() ? hideClosed() : hideIcon() }
        </span> }
      </div>
    </div>
  )
}