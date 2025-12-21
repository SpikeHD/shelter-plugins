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

    const oldElm = document.querySelector('div[class*="-browserNotice"')
    const owner = shelter.util.getFiberOwner(oldElm)
    const keybindsArea = oldElm.parentElement

    // hide browser notice
    // @ts-expect-error this is real
    oldElm.style.display = 'none'

    // Find the divider in the keybinds area
    const divider = keybindsArea.parentElement.parentElement.querySelector('div[class*="-divider"]')
    if (divider)
      // @ts-expect-error this is real
      divider.style.display = 'none'

    // Remove big margin on the default keybinds bit
    const defaultKeybinds = keybindsArea.parentElement.parentElement.querySelector('div[class*="marginTop"]')
    if (defaultKeybinds)
      // @ts-expect-error this is real
      defaultKeybinds.style.marginTop = '0'

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
