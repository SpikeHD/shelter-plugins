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
let notice: HTMLElement = null
let noticeDisplay = ''
let defaultKeybinds: HTMLElement = null
let defaultKeybindsMarginTop = ''

const unmount = () => {
  child?.remove()
  child = null

  if (notice) notice.style.display = noticeDisplay
  notice = null

  if (defaultKeybinds) defaultKeybinds.style.marginTop = defaultKeybindsMarginTop
  defaultKeybinds = null
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
    const actionTypes = Array.isArray(ownerActionTypes) && ownerActionTypes.length
      ? ownerActionTypes
      : fallbackActionTypes
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
    notice = browserNotice
    noticeDisplay = browserNotice.style.display
    browserNotice.style.display = 'none'

    defaultKeybinds = keybindsContainer.querySelector('fieldset')?.parentElement
    if (defaultKeybinds) {
      defaultKeybindsMarginTop = defaultKeybinds.style.marginTop
      defaultKeybinds.style.marginTop = '0'
    }

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

FluxDispatcher.subscribe('TRACK', trackSettingsViewedCallback)

register()

export const onUnload = () => {
  unmount()

  FluxDispatcher.unsubscribe('TRACK', trackSettingsViewedCallback)

  unregister()
}
