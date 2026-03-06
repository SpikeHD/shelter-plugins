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

const viewedKeybindsCallback = (payload) => {
  if (payload.section !== 'Keybinds') {
    if (child) {
      child.remove()
      child = null
    }

    return
  }

  const unsub = observeDom('[data-debug-key="keybinds_setting"], [data-debug-key="keybinds_category"]', () => {
    unsub()

    if (child?.isConnected) {
      return
    }

    const browserNotice = document.querySelector('[data-debug-key="keybinds_setting"] [class*="browserNotice"]')
    if (!browserNotice) {
      return
    }

    const owner = shelter.util.getFiberOwner(browserNotice)
    const keybindsArea = browserNotice.parentElement
    if (!owner || !keybindsArea) {
      return
    }

    // hide browser notice
    // @ts-expect-error this is real
    browserNotice.style.display = 'none'

    const keybindsContainer = keybindsArea.parentElement?.parentElement
    if (!keybindsContainer) {
      return
    }

    // Find the divider in the keybinds area
    const divider = keybindsContainer.querySelector(':scope > div[class*="divider"]')
    if (divider)
      // @ts-expect-error this is real
      divider.style.display = 'none'

    // Remove big margin on the default keybinds bit
    const defaultKeybinds = keybindsContainer.querySelector('fieldset')?.parentElement
    if (defaultKeybinds)
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

const trackSettingsViewedCallback = (payload) => {
  if (payload.event !== 'settings_pane_viewed') return

  viewedKeybindsCallback({
    section: payload.properties?.destination_pane,
  })
}

const subscriptions = [
  FluxDispatcher.subscribe('TRACK', trackSettingsViewedCallback)
]

register()

export const onUnload = () => {
  for (const unsub of subscriptions) {
    unsub()
  }

  unregister()
}
