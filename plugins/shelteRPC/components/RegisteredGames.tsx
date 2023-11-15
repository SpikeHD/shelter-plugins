import GameCard from './GameCard'
import { css, classes } from './RegisteredGames.scss'
import WindowProcessSelect from './WindowProcessSelect'

const {
  ui: {
    Divider,
    Header,
    HeaderTags,
    Text,
    injectCss,
    showToast,
    openModal,
    ModalRoot,
    ModalHeader,
    ModalBody,
    ModalFooter
  },
  solid: {
    createSignal,
    createEffect
  },
  plugin: {
    store
  }
} = shelter

let injectedCss = false

export default () => {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const [isDorion, setIsDorion] = createSignal(false)
  const [currentlyPlaying, setCurrentlyPlaying] = createSignal('')
  const [previouslyPlayed, setPreviouslyPlayed] = createSignal({})

  createEffect(async () => {
    setIsDorion(await (window as any)?.__TAURI__?.app.getName() === 'Dorion')
    setCurrentlyPlaying(store.currentlyPlaying || '')
    setPreviouslyPlayed(store.previouslyPlayed || {})

    // Every couple seconds, grab new data from the plugin store
    setInterval(() => {
      setCurrentlyPlaying(store.currentlyPlaying || '')
      setPreviouslyPlayed(store.previouslyPlayed || {})
    }, 2000)
  })

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.shead}>Registered Games</Header>
      <Text
        class={classes.description}
      >
        ShelteRPC will automatically update your status based on the game you're playing (if detectable). You can also manually add games to this list if it isn't being detected.
      </Text>

      <Divider mt={20} mb={20} />

      {
        currentlyPlaying() ? (
          <GameCard
            name={currentlyPlaying()}
            type='playing'
          />
        ) : (
          <GameCard
            type='none'
          />
        )
      }

      <Text
        class={classes.addIt}
      >
        Not seeing your game? {
          isDorion() ? (
            <a
              target="_blank"
              onClick={() => {
                showToast({
                  title: 'ShelteRPC',
                  content: 'This is not implemented yet!',
                  duration: 4000
                })
              }}
            >Add it!</a>
          ) : (
            <>Adding it is unsupported.</>
          )
        }
      </Text>

      <Header class={classes.addhead}>Added Games</Header>
      {
        Object.values(previouslyPlayed()).map((game: ShelteRPCPreviouslyPlayed) => {
          // If we are playing the game, exclude it
          if (game.name === currentlyPlaying()) return null

          return (
            <GameCard
              name={game.name}
              lastPlayed={game.lastPlayed}
              type='played'
            />
          )
        })
      }
    </>
  )
}

function addIt() {
  // Show a modal with WindowProcessSelect
  openModal(
    <ModalRoot>
      <ModalHeader>Add a game</ModalHeader>
      <ModalBody>
        <WindowProcessSelect />
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {}}
          type='neutral'
        >Cancel</Button>
        <Button
          onClick={() => {
            console.log('yo')
          }}
          type='primary'
        >Add</Button>
      </ModalFooter>
    </ModalRoot>
  )
}