export default {
  name: 'Flooed',

  invoke: (name: string, payload?: any) => {
    return window.Flooed.invoke(name, payload)
  },
  event: {
    // emit: (name: string, payload: any) => {
    //   return
    // },
    // listen: async (name: string, callback: (payload: any) => void) => {
    //   return
    // }
    emit: () => {},
    listen: async () => {}
  },
  app: {
    getVersion: () => {
      return window.Flooed.version
    }
  },
  process: {
    relaunch: () => {
      return window.Flooed.invoke('relaunch')
    }
  },
  apiWindow: {
    appWindow: {
      setFullscreen: (isFullscreen: boolean) => {
        return window.Flooed.invoke('set_fullscreen', isFullscreen)
      }
    }
  }
} satisfies Backend