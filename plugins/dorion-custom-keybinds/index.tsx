import { Keybinds } from './components/Keybinds'
import { register, unregister } from './util/events'
import { fallbackActionTypes, fallbackActionDescriptions } from './util/actionOptions'

const {
  flux: {
    dispatcher: FluxDispatcher,
  },
  ui: {
    ReactiveRoot
  }
} = shelter

let child: Element = null

const viewedKeybindsCallback = (payload) => {
  if (payload.section !== 'system_panel') {
    if (child) {
      child.remove()
      child = null
    }

    return
  }

  const el = document.querySelector('[data-nav-anchor-key="system_custom_keybinds_category"]')
  if (el) {
    if (child?.isConnected) {
      console.warn('Keybinds component already mounted, skipping')
      return
    }

    const browserNotice = el.querySelector('[data-nav-anchor-key="custom_keybinds_setting"]')
    if (!browserNotice) {
      console.warn('Could not find browser notice element, skipping')
      return
    }

    const owner = shelter.util.getFiberOwner(browserNotice)
    const keybindsArea = browserNotice.parentElement
    if (!keybindsArea) {
      console.warn('Could not find keybinds area, skipping')
      return
    }

    const ownerActionTypes = owner?.props?.keybindActionTypes
    const actionTypes = Array.isArray(ownerActionTypes) && ownerActionTypes.length
      ? ownerActionTypes
      : fallbackActionTypes
    const actionDescriptions = {
      ...fallbackActionDescriptions,
      ...owner?.props?.keybindDescriptions,
    }

    // hide browser notice
    // @ts-expect-error this is real
    browserNotice.style.display = 'none'

    const keybindsContainer = keybindsArea.parentElement?.parentElement
    if (!keybindsContainer) {
      console.warn('Could not find keybinds container, skipping')
      return
    }

    // Remove big margin on the default keybinds bit
    const defaultKeybinds = keybindsContainer.querySelector('fieldset')?.parentElement
    if (defaultKeybinds)
      defaultKeybinds.style.marginTop = '0'

    child = keybindsArea.appendChild(
      <ReactiveRoot>
        <Keybinds
          // Remove PUSH_TO_TALK because that is set in the voice & video section and I can't be assed
          // to come up with a good way to handle it being set somewhere else right now
          keybindActionTypes={actionTypes.filter((k) => k.value !== 'PUSH_TO_TALK')}
          keybindDescriptions={actionDescriptions}
        />
      </ReactiveRoot>
    )
  }
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
