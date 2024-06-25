import { event } from '../../../api/api.js'
import { keybindActions } from './actionMap.js'

const {
  flux: {
    dispatcher: FluxDispatcher
  }
} = shelter

const events = []

export const register = () => {
  events.push(event.listen('keybind_pressed', (e) => {
    const key = e.payload
    const action = keybindActions?.[key]

    if (!action || !action.press) return

    for (const press of action.press) {
      let e = press

      if (action.storeValue) {
        const { store, modify } = action.storeValue
        const storeInstance = shelter.flux.stores[store]
        e = modify(e, storeInstance)
      }

      FluxDispatcher.dispatch(
        e
      )
    }
  }))
  
  events.push(event.listen('keybind_released', (e) => {
    const key = e.payload
    const action = keybindActions?.[key]

    if (!action || !action.release) return

    for (const release of action.release) {
      let e = release

      if (action.storeValue) {
        const { store, modify } = action.storeValue
        const storeInstance = shelter.flux.stores[store]
        e = modify(e, storeInstance)
      }

      FluxDispatcher.dispatch(
        release
      )
    }

  }))
}

export const unregister = () => {
  events.forEach((e) => e())
}
