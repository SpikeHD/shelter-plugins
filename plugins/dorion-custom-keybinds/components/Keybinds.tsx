import { event, invoke, process } from '../../../api/api'
import { t } from '../../../util/i18n.js'
import { css, classes } from './Keybinds.tsx.scss'
import { KeybindSection } from './KeybindSection'

const {
  ui: {
    Button,
    Text,
    SwitchItem,
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

  const [keybindsEnabled, setKeybindsEnabled] = createSignal(false)
  const [keybindEnabledChanged, setKeybindEnabledChanged] = createSignal(false)
  // list of keybinds that are set (aka keybinds that have a section already)
  const [keybindSections, setKeybindSections] = createSignal<Keybind>([])

  createEffect(async () => {
    const keybinds = await invoke('get_keybinds')
    const config = await invoke('get_config')

    // Convert the map (key: bind[]) to the array
    const sections = Object.keys(keybinds).map((key) => ({
      key,
      keys: keybinds[key]
    }))

    setKeybindSections(sections)
    setKeybindsEnabled(config.keybinds_enabled ?? false)
  }, [])

  const updateKeybinds = (keybinds: Keybind[]) => {
    setKeybindSections(keybinds)

    event.emit('keybinds_changed', keybinds)
  }

  return (
    <div class={classes.keybindSection}>
      {
        keybindEnabledChanged() && (
          <div class={classes.keybindRestartCard}>
            <Text>
                {t('dorion_keybinds.keybinds_restart_required')}
            </Text>

            <Button
              class={classes.keybindRestartButton}
              grow={true}
              onClick={() => {
                process.relaunch()
              }}
            >
                {t('dorion_keybinds.restart')}
            </Button>
          </div>
        )
      }
        
      <div class={classes.keybindsHeader}>
        <div class={classes.keybindsBanner}>
          <Text>
            {t('dorion_keybinds.global_keybinds_experimental')}
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
          {t('dorion_keybinds.add_keybind')}
        </Button>
      </div>

      <div class={classes.keybindsSwitch}>
        <SwitchItem
          value={keybindsEnabled()}
          onChange={async (value) => {
            setKeybindsEnabled(value)
            setKeybindEnabledChanged(true)
            invoke('set_config', {
              config: {
                ...await invoke('get_config'),
                keybinds_enabled: value
              }
            })
          }}
          note={t('dorion_keybinds.enable_global_keybinds_note')}
        >
          {t('dorion_keybinds.enable_global_keybinds')}
        </SwitchItem>
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
              updateKeybinds(keybindSections().filter((bind) => bind.key !== keybind.key))
            }}
          />
        ))
      }
    </div>
  )
}
