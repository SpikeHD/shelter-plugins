import { keyToStr, strToKey } from '../util/keyUtil.js'
import { css, classes } from './KeybindInput.tsx.scss'

const {
  solid: {
    createSignal,
    onCleanup
  },
  ui: {
    Text,
    injectCss
  }
} = shelter

interface Props {
  initialKeybind: KeyStruct[]
  onKeybindChange(keybind: KeyStruct[]): void

  // style overrides
  style?: string
  disabled?: boolean
}

let injectedCss = false

export function KeybindInput(props: Props) {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const [recording, setRecording] = createSignal(false)
  const [keybind, setKeybind] = createSignal<KeyStruct[]>(props.initialKeybind || [])

  onCleanup(() => {
    window.removeEventListener('keydown', keyDown),
    window.removeEventListener('keyup', keyUp)
  })

  const keyDown = (e) => {
    const keycode = {
      name: e.key,
      code: e.code,
    }

    if (keycode.name.length === 1) {
      keycode.name = keycode.name.toUpperCase()
    }

    // If the key is already in the keybind, don't add it again
    if (keybind().find((k) => k.code === keycode.code)) {
      return
    }

    // if ctrl, alt, or shift, add it to the front of the keybind
    switch (e.key) {
    case 'Control':
    case 'Alt':
    case 'Shift':
    case 'Meta':
      setKeybind([keycode, ...keybind()])
      break
    default:
      setKeybind([...keybind(), keycode])
    }
  }

  const keyUp = (e) => {
    const keycode = {
      name: e.key,
      code: e.code,
    }
    setKeybind(keybind().filter((k) => k.code !== keycode.code))
  }

  const setRecordingState = () => {
    if (recording()) {
      // Remove all event listeners
      window.removeEventListener('keydown', keyDown),
      window.removeEventListener('keyup', keyUp)

      // Set the keybind
      props.onKeybindChange(keybind())

      setRecording(false)

      return
    }

    // Clear the keybind
    setKeybind([])

    // Create event listeners to set the keybind based on what is being held down
    window.addEventListener('keydown', keyDown),
    window.addEventListener('keyup', keyUp)

    setRecording(true)
  }

  return (
    <div
      class={classes.keybindContainer + ' ' + (recording() ? classes.recording : null)}
      style={props.style}
    >
      <div class={classes.keybindInput}>
        <Text class={!keybind().length ? classes.keybindPlaceholder : ''}>
          {
            keybind().length ? keybind().map((k, i) => {
              return i === keybind().length - 1 ? k.name : k.name + ' + '
            }) : 'No Keybind Set'
          }
        </Text>

      </div>
      <div
        class={classes.keybindButton + ' ' + (props.disabled ? classes.disabled : '')}
        onClick={() => {
          if (props.disabled) return

          setRecordingState()
        }}
      >
        <Text>{recording() ? 'Stop Recording' : 'Edit Keybind'}</Text>
      </div>
    </div>
  )
}