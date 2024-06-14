import { css, classes } from './KeybindSection.tsx.scss'
import { Dropdown } from '../../../components/Dropdown'

const {
  ui: {
    Switch,
    Text,
    HeaderTags,
    Header,
    injectCss
  },
} = shelter

interface Props {
  name: string
  keybindActionTypes: Record<string, string>
  internalName: string
  description: string

  keybinds: [number, number, number][]
  enabled: boolean
}

let injectedCss = false

export function KeybindSection(props) {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  return (
    <div class={classes.keybindSection}>
      <div class={classes.actionSection}>
        <Header size={HeaderTags.H5}>
          Action
        </Header>

        <Dropdown
          value={props.name}
          options={Object.entries(props.keybindActionTypes).map(([key, value]) => {
            return {
              value: key,
              label: value
            }
          })}
          onChange={(e) => {
            console.log(e)
          }}
        ></Dropdown>
      </div>

      <div class={classes.keybindArea}>
        <Header size={HeaderTags.H5}>
          Keybind
        </Header>
      </div>
    </div>
  )
}