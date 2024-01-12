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
  const topbar = document.querySelector('#dorion_topbar') as HTMLDivElement

  if (topbar) {
    topbar.style.display = payload?.isElementFullscreen ? 'none' : 'initial'
  }

  appWindow?.setFullscreen(payload?.isElementFullscreen)
}

FluxDispatcher.subscribe('WINDOW_FULLSCREEN_CHANGE', toggleFullscreen)

export const onUnload = () => {
  FluxDispatcher.unsubscribe('WINDOW_FULLSCREEN_CHANGE', toggleFullscreen)
}
