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

const unmount = () => {
  child?.remove()
  child = null
}

const viewedKeybindsCallback = (payload) => {
  if (payload.section !== 'system_panel') {
    unmount()
    return
  }

  const el = document.querySelector('[data-nav-anchor-key="system_custom_keybinds_category"]')
  if (el) {
    if (child?.isConnected) {
      console.warn('Keybinds component already mounted, skipping')
      return
    }
    unmount()

    const browserNotice = el.querySelector<HTMLElement>('[data-nav-anchor-key="custom_keybinds_setting"]')
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
    // Push to Talk is configured in Voice & Video, so exclude it here.
    const availableActions = Array.isArray(ownerActionTypes)
      ? ownerActionTypes.filter((action) =>
        typeof action?.value === 'string' &&
        typeof action?.label === 'string' &&
        action.value !== 'PUSH_TO_TALK'
      )
      : []
    const actionTypes = availableActions.some((action) => action.value !== 'UNASSIGNED')
      ? availableActions
      : fallbackActionTypes.filter((action) => action.value !== 'PUSH_TO_TALK')
    const actionDescriptions = {
      ...fallbackActionDescriptions,
      ...owner?.props?.keybindDescriptions,
    }

    const keybindsContainer = keybindsArea.parentElement?.parentElement
    if (!keybindsContainer) {
      console.warn('Could not find keybinds container, skipping')
      return
    }

    // Remove big margin on the default keybinds bit
    browserNotice.style.display = 'none'

    const defaultKeybinds = keybindsContainer.querySelector('fieldset')?.parentElement
    if (defaultKeybinds) defaultKeybinds.style.marginTop = '0'

    // Also remove the divider, we create our own
    const divider = document.querySelector('div[class^=categories] > div[class^=divider]')
    if (divider) divider.remove()

    child = keybindsArea.appendChild(
      <ReactiveRoot>
        <Keybinds
          keybindActionTypes={actionTypes}
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

FluxDispatcher.subscribe('TRACK', trackSettingsViewedCallback)

register()

export const onUnload = () => {
  unmount()

  FluxDispatcher.unsubscribe('TRACK', trackSettingsViewedCallback)

  unregister()
}
