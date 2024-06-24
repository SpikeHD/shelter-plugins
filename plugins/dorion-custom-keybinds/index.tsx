import { Keybinds } from './components/Keybinds'
import { register, unregister } from './util/events'

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

    const oldElm = document.querySelector('div[class*="browserNotice_"')
    const owner = shelter.util.getFiberOwner(oldElm)
    const keybindsArea = oldElm.parentElement

    // hide browser notice
    // @ts-expect-error this is real
    oldElm.style.display = 'none'

    child = keybindsArea.appendChild(
      <ReactiveRoot>
        <Keybinds
          // Remove PUSH_TO_TALK because that is set in the voice & video section and I can't be assed
          // to come up with a good way to handle it being set somewhere else right now
          // @ts-expect-error it does exist I promise
          keybindActionTypes={owner.keybindActionTypes.filter((k) => k.value !== 'PUSH_TO_TALK')}
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

register()

export const onUnload = () => {
  for (const unsub of subscriptions) {
    unsub()
  }

  unregister()
}



