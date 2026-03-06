import { event, invoke } from '../../../api/api.js'
import { keybindActions } from './actionMap.js'

const {
  flux: {
    dispatcher: FluxDispatcher
  }
} = shelter

const unsubs = []
const activeActions = new Set<string>()
const pressedCodes = new Set<string>()
const pressedNames = new Set<string>()

let keybindsEnabled = false
let keybinds: Record<string, KeyStruct[]> = {}

const normalizeName = (name: string) => {
  if (name.length === 1) return name.toUpperCase()
  return name
}

const isCodePressed = (code: string) => {
  if (pressedCodes.has(code)) return true

  if (code === 'Control') return [...pressedCodes].some((k) => k.startsWith('Control'))
  if (code === 'Shift') return [...pressedCodes].some((k) => k.startsWith('Shift'))
  if (code === 'Alt') return [...pressedCodes].some((k) => k.startsWith('Alt'))
  if (code === 'Meta') return [...pressedCodes].some((k) => k.startsWith('Meta'))

  return false
}

const keybindMatches = (bind: KeyStruct[]) => {
  if (!bind || bind.length === 0) return false
  if (pressedCodes.size !== bind.length) return false

  return bind.every((part) => {
    if (part.code && isCodePressed(part.code)) return true
    if (part.name && pressedNames.has(normalizeName(part.name))) return true
    return false
  })
}

const dispatchActionEvents = (key: string, eventType: 'press' | 'release') => {
  const action = keybindActions?.[key]
  const events = action?.[eventType]

  if (!action || !events) return

  for (const baseEvent of events) {
    let evt = baseEvent

    if (action.storeValue) {
      const { store, modify } = action.storeValue
      const storeInstance = shelter.flux.stores[store]
      evt = modify(evt, storeInstance)
    }

    FluxDispatcher.dispatch(evt)
  }
}

const releaseActiveActions = () => {
  for (const action of activeActions) {
    dispatchActionEvents(action, 'release')
  }

  activeActions.clear()
}

const keydownListener = (e: KeyboardEvent) => {
  pressedCodes.add(e.code)
  pressedNames.add(normalizeName(e.key))

  if (!keybindsEnabled || e.repeat) return

  for (const [action, bind] of Object.entries(keybinds)) {
    if (action === 'UNASSIGNED' || activeActions.has(action)) continue
    if (!keybindMatches(bind)) continue

    activeActions.add(action)
    dispatchActionEvents(action, 'press')
  }
}

const keyupListener = (e: KeyboardEvent) => {
  pressedCodes.delete(e.code)
  pressedNames.delete(normalizeName(e.key))

  if (!keybindsEnabled || activeActions.size === 0) return

  for (const action of [...activeActions]) {
    const bind = keybinds[action]
    if (bind && keybindMatches(bind)) continue

    activeActions.delete(action)
    dispatchActionEvents(action, 'release')
  }
}

const blurListener = () => {
  pressedCodes.clear()
  pressedNames.clear()
  releaseActiveActions()
}

const applyKeybindsPayload = (payload: Keybind[] | Record<string, KeyStruct[]>) => {
  if (Array.isArray(payload)) {
    keybinds = payload.reduce<Record<string, KeyStruct[]>>((acc, bind) => {
      if (bind.key !== 'UNASSIGNED') {
        acc[bind.key] = bind.keys
      }

      return acc
    }, {})

    return
  }

  keybinds = payload || {}
}

const syncKeybinds = async () => {
  const [binds, config] = await Promise.all([
    invoke('get_keybinds'),
    invoke('get_config')
  ])

  applyKeybindsPayload(binds)
  keybindsEnabled = config?.keybinds_enabled ?? false
}

export const register = () => {
  syncKeybinds()

  window.addEventListener('keydown', keydownListener)
  window.addEventListener('keyup', keyupListener)
  window.addEventListener('blur', blurListener)

  unsubs.push(event.listen('keybinds_changed', (e) => {
    const updated = e.payload || []
    applyKeybindsPayload(updated)

    releaseActiveActions()
  }))

  unsubs.push(event.listen('keybind_pressed', (e) => {
    // When the window already has focus, the local keydown listener already handled this action.
    if (document.hasFocus()) return

    const key = e.payload
    dispatchActionEvents(key, 'press')
  }))
  
  unsubs.push(event.listen('keybind_released', (e) => {
    if (document.hasFocus()) return

    const key = e.payload
    dispatchActionEvents(key, 'release')
  }))
}

export const unregister = () => {
  window.removeEventListener('keydown', keydownListener)
  window.removeEventListener('keyup', keyupListener)
  window.removeEventListener('blur', blurListener)

  releaseActiveActions()

  unsubs.forEach((entry) => {
    if (typeof entry === 'function') {
      entry()
      return
    }

    entry?.then?.((unlisten) => {
      if (typeof unlisten === 'function') {
        unlisten()
      }
    })
  })
}
