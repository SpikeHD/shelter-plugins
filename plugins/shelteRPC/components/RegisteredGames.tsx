import GameCard from './GameCard'
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
  const [local, setLocal] = createSignal([])

  createEffect(async () => {
    setIsDorion(await (window as any)?.__TAURI__?.app.getName() === 'Dorion')
    setCurrentlyPlaying(store.currentlyPlaying || '')
    setPreviouslyPlayed(store.previouslyPlayed || {})

    // Also grab local detectable games
    setLocal(isDorion && await invoke('get_local_detectables'))

    // For all local detectables that match existing previously played games, add the "local" property
    // This is used to show the "delete" icon
    const markLocals = () => {
      for (const o of local()) {
        const maybeIdx = Object.values(previouslyPlayed()).findIndex((p: ShelteRPCPreviouslyPlayed) => p.name === o.name)
        if (maybeIdx !== -1) {
          previouslyPlayed()[Object.keys(previouslyPlayed())[maybeIdx]]['local'] = true
        }
      }
    }

    markLocals()

    // Every couple seconds, grab new data from the plugin store
    setInterval(() => {
      setCurrentlyPlaying(store.currentlyPlaying || '')
      setPreviouslyPlayed(store.previouslyPlayed || {})

      markLocals()
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
            local={
              Object.values(previouslyPlayed()).find((p: ShelteRPCPreviouslyPlayed) => p.name === currentlyPlaying())?.local || false
            }
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
              local={game?.local}
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
      <ModalHeader
        close={props.close}
      >Add a game</ModalHeader>
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
          event.emit('add_detectable', {
            exe: windows().find((w) => w.pid === selected())?.process_name,
            name: name(),
          })
        }}
        onCancel={props.close}
        confirmText="Add"
        cancelText="Cancel"
        type={'neutral'}
      />
    </ModalRoot>
  ))
}