const {
  ui: {
    Switch,
  },
  util: {
    reactFiberWalker,
    getFiber
  },
  flux: {
    dispatcher: FluxDispatcher
  },
  solid: {
    createSignal,
  },
  observeDom,
  patcher
} = shelter

const { invoke, notification } = (window as any).__TAURI__

let isOnNotifSection = false

const notifSelector = 'div[class*="contentColumn"] div[class*="container"] div[class*="control"]'

FluxDispatcher.subscribe('USER_SETTINGS_MODAL_SET_SECTION', async (payload) => {
  if (payload.section !== 'Notifications') {
    // This removes the CSS
    isOnNotifSection = false
    return
  }
  else if (isOnNotifSection) return
  isOnNotifSection = true

  const [settings, setSettings] = createSignal<DorionSettings>(JSON.parse(await invoke('read_config_file')))

  const unobserve = observeDom(notifSelector, (node: HTMLDivElement) => {
    unobserve.now()

    const fiber = reactFiberWalker(getFiber(node), 'onChange', false)

    console.log(fiber)

    patcher.instead('onChange', fiber?.pendingProps, ([v, _e]) => {
      console.log(v)
      console.log(_e)
      console.log(this)
      
      setSettings({
        ...settings,
        desktop_notifications: v
      })

      // Save the settings
      invoke('write_config_file', {
        contents: JSON.stringify(settings())
      })
    })
  })
})

FluxDispatcher.subscribe('RPC_NOTIFICATION_CREATE', async (payload) => {
  let permGranted = await notification.isPermissionGranted()

  if (!permGranted) {
    console.log('Requesting permission...')
    permGranted = (await notification.requestPermission()) === 'granted'
  }

  if (!permGranted) return console.log('No permissions!')

  // Only if we know we have permission should we check if the user wants notifications
  const settings: DorionSettings = JSON.parse(await invoke('read_config_file'))

  if (!settings.desktop_notifications) return

  notification.sendNotification({
    title: payload.title,
    body: payload.body,
    icon: payload.icon,
  })
})

export const onUnload = () => {

}