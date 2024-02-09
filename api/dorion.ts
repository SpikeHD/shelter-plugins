export default {
  invoke: (name: string, payload?: any) => {
    return (window as any).__TAURI__.invoke(name, payload)
  },
  event: {
    emit: (name: string, payload: any) => {
      return (window as any).__TAURI__.event.emit(name, payload)
    },
    listen: async (name: string, callback: (payload: any) => void) => {
      return (window as any).__TAURI__.event.listen(name, callback)
    }
  },
  app: {
    getVersion: () => {
      return (window as any).__TAURI__.app.getVersion()
    },
    getName: () => {
      return (window as any).__TAURI__.app.getName()
    }
  },
  process: {
    relaunch: () => {
      return (window as any).__TAURI__.process.relaunch()
    }
  },
  apiWindow: {
    appWindow: {
      setFullscreen: (isFullscreen: boolean) => {
        return (window as any).__TAURI__.window.appWindow.setFullscreen(isFullscreen)
      }
    }
  }
} satisfies Backend