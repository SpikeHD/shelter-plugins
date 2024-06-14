
import { KeybindSection } from "./components/KeybindSection"

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
    // const root = ReactDOM.createRoot(keybindsArea)
    const keybindObjs = Object.entries(owner.keybindDescriptions).map(([key, value], i) => {
      return {
        id: i,
        enabled: true,
        action: key,
        shortcut: [],
        managed: false,
        params: {}
      }
    })

    // hide (don't remove) all children
    for (const child of keybindsArea.children) {
      child.style.display = 'none'
    }

    // root.render(
    //   owner.renderKeybinds(keybindObjs)
    // )

    keybindsArea.appendChild(
      <ReactiveRoot>
        <KeybindSection
          name="test"
          keybindActionTypes={owner.keybindActionTypes}
          internalName="test"
          description="test"
          keybinds={keybindObjs.map(k => k.shortcut)}
          enabled={true}
        ></KeybindSection>
      </ReactiveRoot>
    )
  })
}

const subscriptions = [
  FluxDispatcher.subscribe('USER_SETTINGS_MODAL_SET_SECTION', viewedKeybindsCallback)
]



