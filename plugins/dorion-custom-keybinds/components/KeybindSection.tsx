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

  onKeybindChange: (keybind: Keybind, old: Keybind) => void
  onKeybindRemove: (keybind: Keybind) => void

  // Not to be confused with keybind related stuff, this is just so it can be used in a loop
  key?: any
}

interface CLoseProps {
  onClick: () => void
}

const RemoveIcon = (props: CLoseProps) => (
  <svg onClick={props.onClick} width="256" height="256" viewBox="0 0 256 256" style="height: 100%">
    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
      <path d="M 11 90 c -2.815 0 -5.63 -1.074 -7.778 -3.222 c -4.295 -4.296 -4.295 -11.261 0 -15.557 l 68 -68 c 4.297 -4.296 11.26 -4.296 15.557 0 c 4.296 4.296 4.296 11.261 0 15.557 l -68 68 C 16.63 88.926 13.815 90 11 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: var(--status-danger); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
      <path d="M 79 90 c -2.815 0 -5.63 -1.074 -7.778 -3.222 l -68 -68 c -4.295 -4.296 -4.295 -11.261 0 -15.557 c 4.296 -4.296 11.261 -4.296 15.557 0 l 68 68 c 4.296 4.296 4.296 11.261 0 15.557 C 84.63 88.926 81.815 90 79 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: var(--status-danger); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
    </g>
  </svg>
)
let injectedCss = false

export function KeybindSection(props: Props) {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const [keybindType, setKeybindType] = createSignal(props.internalName || props.keybind?.key || props.keybindActionTypes[0].value)
  const old = props.keybind

  return (
    <div class={classes.keybindRoot}>
      <div class={classes.keybindSection}>
        <div class={classes.actionSection}>
          <Header size={HeaderTags.H5}>
            Action
          </Header>

          <Dropdown
            value={props.internalName || props.keybind?.key || props.keybindActionTypes[0].value}
            options={props.keybindActionTypes}
            onChange={(e) => {
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
              }, old)
            }}
            style='width: 100%'
          />
        </div>

        <div class={classes.removeButton}>
          <RemoveIcon onClick={() => props.onKeybindRemove(old)} />
        </div>
      </div>

      <Text class={classes.note}>
        {props.keybindDescriptions[keybindType()]}
      </Text>
    </div>

  )
}