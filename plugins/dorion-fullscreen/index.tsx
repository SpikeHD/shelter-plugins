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
  const isFullscreen = payload?.properties?.video_layout === 'full-screen'
  appWindow?.setFullscreen(isFullscreen)
}

FluxDispatcher.subscribe('TRACK', toggleFullscreen)

export const onUnload = () => {
  FluxDispatcher.unsubscribe('TRACK', toggleFullscreen)
}