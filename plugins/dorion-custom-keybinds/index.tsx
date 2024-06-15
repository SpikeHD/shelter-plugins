import { Keybinds } from './components/Keybinds'

const {
  flux: {
    dispatcher: FluxDispatcher,
  },
  observeDom,
  ui: {
    ReactiveRoot
  }
} = shelter

let child: Element = null

const viewedKeybindsCallback = (e) => {
  if (e.section !== 'Keybinds') {
    if (child) {
      child.remove()
      child = null
    }

    return
  }

  const unsub = observeDom('#keybinds-tab', () => {
    unsub()

    const oldElm = document.querySelector('.browserNotice__7a436')
    const owner = shelter.util.getFiberOwner(oldElm)
    const keybindsArea = document.querySelector('#keybinds-tab')

    // hide (don't remove) all children
    // @ts-expect-error this is iterable
    for (const child of keybindsArea.children) {
      child.style.display = 'none'
    }

    child = keybindsArea.appendChild(
      <ReactiveRoot>
        <Keybinds
          // @ts-expect-error it does exist I promise
          keybindActionTypes={owner.keybindActionTypes}
          // @ts-expect-error it does exist I promise
          keybindDescriptions={owner.keybindDescriptions}
        />
      </ReactiveRoot>
    )
  })
}

const subscriptions = [
  FluxDispatcher.subscribe('USER_SETTINGS_MODAL_SET_SECTION', viewedKeybindsCallback)
]

export const onUnload = () => {
  for (const unsub of subscriptions) {
    unsub()
  }
}



