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
      FluxDispatcher.dispatch(
        press
      )
    }
  }))
  
  events.push(event.listen('keybind_released', (e) => {
    const key = e.payload
    const action = keybindActions?.[key]

    if (!action || !action.release) return

    for (const release of action.release) {
      FluxDispatcher.dispatch(
        release
      )
    }

  }))
}

export const unregister = () => {
  events.forEach((e) => e())
}
