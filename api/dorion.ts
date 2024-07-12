export default {
  name: 'Dorion',

  invoke: (name: string, payload?: any) => {
    // for tauri v2, `invoke` exists on __TAURI__.core, instead of base __TAURI__, so we should check for both
    if ((window as any).__TAURI__?.invoke) {
      return (window as any).__TAURI__.invoke(name, payload)
    } else {
      return (window as any).__TAURI__.core.invoke(name, payload)
    }
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
        // for tauri v2, `setFullscreen` exists on __TAURI__.webviewWindow.getCurrent()[0], instead of base __TAURI__.window.appWindow, so we should check for both
        if ((window as any).__TAURI__?.webviewWindow?.getCurrent) {
          return (window as any).__TAURI__.webviewWindow.getCurrent().setFullscreen(isFullscreen)
        } else {
          return (window as any).__TAURI__.window.appWindow.setFullscreen(isFullscreen)
        }
      }
    }
  }
} satisfies Backend