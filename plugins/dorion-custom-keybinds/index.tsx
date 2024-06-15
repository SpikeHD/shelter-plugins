
import { Keybinds } from "./components/Keybinds"

const {
  flux: {
    intercept,
    dispatcher: FluxDispatcher,
  },
  observeDom,
  ReactDOM,
  ui: {
    ReactiveRoot
  }
} = shelter

const viewedKeybindsCallback = (e) => {
  if (e.section !== 'Keybinds') return

  const unsub = observeDom('#keybinds-tab', () => {
    unsub()

    const oldElm = document.querySelector('.browserNotice__7a436')
    const owner = shelter.util.getFiberOwner(oldElm)
    const proto = Object.getPrototypeOf(owner)

    console.log(owner)
    console.log(proto)

    window.keybinds = {
      owner,
      proto,
    }

    const keybindsArea = document.querySelector('#keybinds-tab')

    // hide (don't remove) all children
    for (const child of keybindsArea.children) {
      child.style.display = 'none'
    }

    keybindsArea.appendChild(
      <ReactiveRoot>
        <Keybinds
          keybindActionTypes={owner.keybindActionTypes}
          keybindDescriptions={owner.keybindDescriptions}
        />
      </ReactiveRoot>
    )
  })
}

const subscriptions = [
  FluxDispatcher.subscribe('USER_SETTINGS_MODAL_SET_SECTION', viewedKeybindsCallback)
]



