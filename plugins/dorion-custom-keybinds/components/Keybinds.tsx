import { event, invoke } from '../../../api/api'
import { css, classes } from './Keybinds.tsx.scss'
import { KeybindSection } from './KeybindSection'

const {
  ui: {
    Button,
    Text,
    HeaderTags,
    Header,
    injectCss
  },
  solid: {
    createSignal,
    createEffect
  }
} = shelter

let injectedCss = false

interface Props {
  keybindActionTypes: KeybindActionType[]
  keybindDescriptions: KeybindDescription[]
}

export function Keybinds(props: Props) {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  // list of keybinds that are set (aka keybinds that have a section already)
  const [keybindSections, setKeybindSections] = createSignal<Keybind>([])

  createEffect(async () => {
    const keybinds = await invoke('get_keybinds')

    // Convert the map (key: bind[]) to the array
    const sections = Object.keys(keybinds).map((key) => ({
      key,
      keys: keybinds[key]
    }))

    setKeybindSections(sections)
  }, [])

  const updateKeybinds = (keybinds: Keybind[]) => {
    setKeybindSections(keybinds)

    event.emit('keybinds_changed', keybinds)
  }

  return (
    <div class={classes.keybindSection}>
      <Header tag={HeaderTags.H1} class={classes.header}>
        Keybinds
      </Header>

      <div class={classes.keybindsHeader}>
        <div class={classes.keybindsBanner}>
          <Text>
            Global keybinds are an experimental feature!
          </Text>  
        </div>

        <Button
          class={classes.keybindsButton}
          grow={true}
          onClick={() => {
            // Ensure keybinds list max is the same as the keybindActionTypes list
            if (keybindSections().length >= props.keybindActionTypes.length) {
              return
            }

            updateKeybinds([...keybindSections(), {
              key: 'UNASSIGNED',
              keys: []
            }])
          }}
        >
          Add Keybind
        </Button>
      </div>

      {
        keybindSections().map((section: Keybind, idx) => (
          <KeybindSection
            key={idx}
            keybindActionTypes={
              // Filter out keybinds that are already set (and it's own key). Always allow UNASSIGNED
              props.keybindActionTypes.filter((type) => {
                if (section.key === 'UNASSIGNED' || section.key === type.value) return true
                return !keybindSections().some((keybind) => keybind.key === type.value)
              })
            }
            keybindDescriptions={props.keybindDescriptions}
            keybind={section}
            onKeybindChange={(keybind, old) => {
              // If the keybind is the same (and we are just changing the action), we don't need to remove the old keybind,
              // we can just modify the existing keybind
              if (keybind.key === old.key) {
                updateKeybinds(keybindSections().map((bind) => {
                  if (bind.key === keybind.key) {
                    return keybind
                  }

                  return bind
                }))

                return
              }
              
              const newKeybinds = keybindSections().filter(
                bind => bind.key !== keybind.key && bind.key !== old.key
              )

              newKeybinds.push(keybind)

              updateKeybinds(newKeybinds)
            }}
            onKeybindRemove={(keybind) => {
              console.log(keybind)
              updateKeybinds(keybindSections().filter((bind) => bind.key !== keybind.key))
            }}
          />
        ))
      }
    </div>
  )
}