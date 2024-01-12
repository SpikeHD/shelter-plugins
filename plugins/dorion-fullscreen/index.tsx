const {
  flux: {
    dispatcher: FluxDispatcher
  },
} = shelter

const {
  window: {
    appWindow
  }
} = (window as any).__TAURI__

const toggleFullscreen = async (payload) => {
  appWindow?.setFullscreen(payload?.isElementFullscreen)
}

FluxDispatcher.subscribe('WINDOW_FULLSCREEN_CHANGE', toggleFullscreen)

export const onUnload = () => {
  FluxDispatcher.unsubscribe('WINDOW_FULLSCREEN_CHANGE', toggleFullscreen)
}
