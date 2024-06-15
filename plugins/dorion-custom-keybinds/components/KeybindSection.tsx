import { css, classes } from './KeybindSection.tsx.scss'
import { Dropdown } from '../../../components/Dropdown'
import { KeybindInput } from '../../../components/KeybindInput'

const {
  ui: {
    Button,
    Switch,
    Text,
    HeaderTags,
    Header,
    injectCss
  },
  solid: {
    createSignal
  }
} = shelter

interface Props {
  internalName?: string
  enabled?: boolean

  keybindActionTypes: KeybindActionType[]
  keybindDescriptions: KeybindDescription[]
  keybind?: Keybind

  onKeybindChange: (keybind: Keybind) => void

  // Not to be confused with keybind related stuff, this is just so it can be used in a loop
  key?: any
}

let injectedCss = false

export function KeybindSection(props: Props) {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const [keybindType, setKeybindType] = createSignal(props.internalName || props.keybindActionTypes[0].value)

  return (
    <div class={classes.keybindRoot}>
      <div class={classes.keybindSection}>
        <div class={classes.actionSection}>
          <Header size={HeaderTags.H5}>
            Action
          </Header>

          <Dropdown
            value={props.internalName || props.keybindActionTypes[0].value}
            options={props.keybindActionTypes}
            onChange={(e) => {
              console.log(e)
              setKeybindType(e.target.value)
            }}
            style='width: 90%'
          ></Dropdown>
        </div>

        <div class={classes.keybindArea}>
          <Header size={HeaderTags.H5}>
            Keybind
          </Header>

          <KeybindInput
            initialKeybind={props.keybind.keys || []}
            onKeybindChange={(keybind) => {
              props.onKeybindChange({
                keys: keybind,
                key: keybindType(),

                // TODO finish this
                action: ''
              })
            }}
            style='width: 100%'
          />
        </div>
      </div>

      <Text class={classes.note}>
        {props.keybindDescriptions[keybindType()]}
      </Text>
    </div>

  )
}