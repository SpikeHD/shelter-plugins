export default {
  name: 'Flooed',

  /* stub */
  invoke: async () => {},
  event: {
    emit: () => {},
    listen: async () => {}
  },
  app: {
    getVersion: () => '0.0.0',
    getName: () => 'None'
  },
  process: {
    relaunch: () => {}
  },
  apiWindow: {
    appWindow: {
      setFullscreen: () => {}
    }
  }
} satisfies Backend