import { apiWindow } from '../../api/api.js'

const {
  flux: {
    dispatcher: FluxDispatcher
  },
} = shelter

let isPopout = false

const toggleFullscreen = async (payload) => {
  if (isPopout) return

  const topbar = document.querySelector('#dorion_topbar') as HTMLDivElement

  if (topbar) {
    topbar.style.display = payload?.isElementFullscreen ? 'none' : 'initial'
  }

  apiWindow.appWindow?.setFullscreen(payload?.isElementFullscreen)
}

const toggleIsPopout = (toggle: boolean) => {
  isPopout = toggle
}

const popoutOff = () => {
  toggleIsPopout(false)
}

const popoutOn = () => {
  toggleIsPopout(true)
}

FluxDispatcher.subscribe('WINDOW_FULLSCREEN_CHANGE', toggleFullscreen)
FluxDispatcher.subscribe('POPOUT_WINDOW_OPEN', popoutOn)
FluxDispatcher.subscribe('WINDOW_UNLOAD', popoutOff)

export const onUnload = () => {
  FluxDispatcher.unsubscribe('WINDOW_FULLSCREEN_CHANGE', toggleFullscreen)
  FluxDispatcher.unsubscribe('POPOUT_WINDOW_OPEN', popoutOn)
  FluxDispatcher.unsubscribe('WINDOW_UNLOAD', popoutOff)
}
