import { keyToStr } from './keyUtil.js'

const {
  flux: {
    dispatcher: FluxDispatcher,
    stores: {
      UserStore
    }
  },
  observeDom
} = shelter

const { invoke, event } = (window as any).__TAURI__
const events = []
const subscriptions = []
const unobserves = []
const warningSelector = 'div[class*="pttToolsMessage_"]'
const radiobarSelector = 'div[class*="radioBar_"]'
const popupSelector = 'div[class*="layerContainer_"] div[class*="layer_"]'

const unobserveAll = () => unobserves.forEach((unobserve) => unobserve())

const settingsHandler = async (payload) => {
  if (payload.section !== 'Voice & Video') {
    // Unobserve all
    unobserveAll()
    return
  }

  // This gets rid of the warning messages, as they donto apply anymore
  unobserves.push(
    observeDom(warningSelector, (node: HTMLDivElement) => {
      node.remove()
    }),
    observeDom(popupSelector, (node: HTMLDivElement) => {
      // Remove the actual popout
      node.remove()

      // Click the backdrop
      const unobserveBackdrop = observeDom('div[class*="backdrop_"]', (backdrop: HTMLDivElement) => {
        backdrop.click()
        unobserveBackdrop()
      })
    }),
    observeDom(radiobarSelector, (node: HTMLDivElement) => {
      const textSelector = 'div[class*="info_"] div[class*="text"]'
      const text = node.querySelector(textSelector)

      if (text.textContent.includes('(')) {
        text.textContent = text.textContent.replace(/\(.+?\)/g, '')
      }
    })
  )
}

// Handles the keybind thing
const keybindCreationHandler = async (payload) => {
  const {
    mode,
    options: {
      shortcut
    }
  } = payload

  const keys = shortcut.map(k => k[1])
  const toKeys = keys.map(keyToStr)

  invoke('save_ptt_keys', { keys: toKeys })

  invoke('toggle_ptt', {
    state: mode === 'PUSH_TO_TALK'
  })
}

// Handles toggling the PTT state
const toggleHandler = async (e) => {
  const { state } = e.payload
  const fluxPayload = {
    type: 'SPEAKING',
    context: 'default',
    // @ts-expect-error This is a real property I promise
    userId: UserStore?.getCurrentUser()?.id,
    speakingFlags: state ? 1 : 0
  }

  console.log('Toggle handler called with state: ', state)

  FluxDispatcher.dispatch(
    fluxPayload
  )
}

subscriptions.push(
  FluxDispatcher.subscribe('USER_SETTINGS_MODAL_SET_SECTION', settingsHandler),
  FluxDispatcher.subscribe('LAYER_POP', unobserveAll),
  FluxDispatcher.subscribe('AUDIO_SET_MODE', keybindCreationHandler)
)

event.listen('ptt_toggle', toggleHandler).then(unlisten => events.push(unlisten))

export const onUnload = () => {
  unobserveAll()
  events.forEach((e) => e())
  subscriptions.forEach((s) => s())
}