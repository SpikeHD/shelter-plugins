import { keyToStr, strToCode } from '../../util/keyUtil.js'
import { invoke, event } from '../../api/api.js'

const {
  flux: {
    dispatcher: FluxDispatcher,
    stores: {
      MediaEngineStore
    }
  },
  observeDom
} = shelter

const events = []
const subscriptions = []
const unobserves = []
const warningSelector = 'div[class*="warning__"]'
const radiobarSelector = 'div[class*="radioBar_"]'
const popupSelector = 'div[class*="layerContainer_"] div[class*="layer_"]'

const unobserveAll = () => unobserves.forEach((unobserve) => unobserve())

const settingsHandler = async (payload) => {
  if (payload.section !== 'Voice & Video') {
    // Unobserve all
    unobserveAll()
    return
  }

  // This gets rid of the warning messages, as they dont apply anymore
  unobserves.push(
    observeDom(warningSelector, (node: HTMLDivElement) => {
      node.remove()
    }),
    observeDom(popupSelector, (node: HTMLDivElement) => {
      if (node.id) return

      // Remove the actual popout
      node.innerHTML = ''

      // Click the backdrop
      const unobserveBackdrop = observeDom('div[class*="scrim_"]', (backdrop: HTMLDivElement) => {
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
  const toKeys = keys.map((k) => ({
    code: strToCode(keyToStr(k)),
    name: keyToStr(k)
  }))

  invoke('set_keybind', { action: 'PUSH_TO_TALK', keys: toKeys })

  event.emit('ptt_toggled', {
    state: mode === 'PUSH_TO_TALK'
  })
}

// Initial set internally
event.emit('ptt_toggled', {
  // @ts-expect-error shut up
  state: MediaEngineStore?.getMode?.() === 'PUSH_TO_TALK'
})

subscriptions.push(
  FluxDispatcher.subscribe('USER_SETTINGS_MODAL_SET_SECTION', settingsHandler),
  FluxDispatcher.subscribe('LAYER_POP', unobserveAll),
  FluxDispatcher.subscribe('AUDIO_SET_MODE', keybindCreationHandler)
)

export const onUnload = () => {
  unobserveAll()
  events.forEach((e) => e())
  subscriptions.forEach((s) => s())
}