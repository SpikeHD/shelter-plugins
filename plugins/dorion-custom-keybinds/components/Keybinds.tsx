import { css, classes } from './Keybinds.tsx.scss'
import { KeybindSection } from './KeybindSection'

const {
  ui: {
    Button,
    Switch,
    Text,
    HeaderTags,
    Header,
    injectCss
  },
} = shelter

let injectedCss = false

interface Props {
  keybindActionTypes: Record<string, string>[] // { label: string, value: string }
  keybindDescriptions: Record<string, string>
}

export function Keybinds(props: Props) {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  return (
    <div class={classes.keybindSection}>
      <Header size={HeaderTags.H1}>
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
        >
          Add Keybind
        </Button>
      </div>

      <KeybindSection
        keybindActionTypes={props.keybindActionTypes}
        keybindDescriptions={props.keybindDescriptions}
        keybinds={[]}
      />
    </div>
  )
}
