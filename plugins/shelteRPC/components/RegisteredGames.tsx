import GameCard from './GameCard'
import WindowProcessSelect from './WindowProcessSelect'
import { Dropdown } from "../../../components/Dropdown"

import { css, classes } from './RegisteredGames.scss'

const {
  ui: {
    Divider,
    Header,
    HeaderTags,
    Text,
    TextBox,
    injectCss,
    openModal,
    ModalRoot,
    ModalHeader,
    ModalBody,
    ModalConfirmFooter
  },
  solid: {
    createSignal,
    createEffect
  },
  plugin: {
    store
  }
} = shelter

const { invoke, event } = (window as any).__TAURI__

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
            <a target="_blank" onclick={addIt}>Add it!</a>
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
  const [windows, setWindows] = createSignal<ProcessWindow[]>([])
  const [selected, setSelected] = createSignal<number>(0)
  const [name, setName] = createSignal<string>('')

  createEffect(async () => {
    const res = await invoke('get_windows')
    setWindows(res)
  })

  // Show a modal with WindowProcessSelect
  openModal((props) => (
    <ModalRoot>
      <ModalHeader>Add a game</ModalHeader>
      <ModalBody>
        {
          windows().length > 0 ? (
            <>
              <Dropdown
                options={windows().map((w: ProcessWindow) => ({
                  label: w.process_name,
                  value: w.pid,
                }))}
                placeholder={'Select process...'}
                maxVisibleItems={5}
                closeOnSelect={true}
                onChange={(e) => setSelected(Number(e.target.value))}
              />

              <Header
                class={classes.modalhead}
              >Name to Display</Header>
              <TextBox
                value={name()}
                onInput={(v) => setName(v)}
                placeholder={'Enter the name to display...'}
              />
            </>
          ) : (
            <Text>
              Please wait...
            </Text>
          )
        }
      </ModalBody>
      <ModalConfirmFooter
        onConfirm={() => {
          console.log(selected())
          console.log(windows())
          console.log(windows().find((w) => w.pid === selected()))
          event.emit('add_detectable', {
            exe: windows().find((w) => w.pid === selected())?.process_name,
            name: name(),
          })
        }}
        onCancel={props.close}
        close={props.close}
        confirmText="Add"
        cancelText="Cancel"
        type={'neutral'}
      />
    </ModalRoot>
  ))
}