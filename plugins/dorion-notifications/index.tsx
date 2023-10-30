const {
  ui: {
    SwitchItem,
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
const [settings, setSettings] = createSignal<DorionSettings>(null)
const notifSelector = 'div[class*="contentColumn"] div[class*="container"]'

let unobserve = null
let isOnNotifSection = false
let newSettingInjected = false

const settingsHandler = async (payload) => {
  if (payload.section !== 'Notifications') {
    // This removes the CSS
    isOnNotifSection = false
    newSettingInjected = false
    return
  }
  else if (isOnNotifSection) return
  isOnNotifSection = true

  unobserve = observeDom(notifSelector, (node: HTMLDivElement) => {
    // Only ever need to get the first
    unobserve.now()

    node.style.display = 'none'

    if (newSettingInjected) return

    const newNotif = (
      <SwitchItem
        note="If you're looking for per-channel or per-server notifications, right-click the desired server icon and select Notification Settings."
        value={settings()?.desktop_notifications}
        onChange={async (value) => {
          setSettings({
            ...settings(),
            desktop_notifications: value
          })

          await invoke('write_config_file', {
            contents: JSON.stringify(settings())
          })
        }}
      >
        Enable Desktop Notifications
      </SwitchItem>
    )

    node.parentElement.prepend(newNotif)

    newSettingInjected = true
  })
}

const notifHandler = async (payload) => {
  let permGranted = await notification.isPermissionGranted()

  if (!permGranted) {
    console.log('Requesting permission...')
    permGranted = (await notification.requestPermission()) === 'granted'
  }

  if (!permGranted) return console.log('No notification permissions!')

  if (!settings()?.desktop_notifications) return

  notification.sendNotification({
    title: payload.title,
    body: payload.body,
    icon: payload.icon,
  })
}

FluxDispatcher.subscribe('USER_SETTINGS_MODAL_SET_SECTION', settingsHandler)
FluxDispatcher.subscribe('RPC_NOTIFICATION_CREATE', notifHandler)

export const onLoad = async () => {
  setSettings(
    JSON.parse(await invoke('read_config_file'))
  )
}

export const onUnload = () => {
  unobserve?.now()
  FluxDispatcher.unsubscribe('USER_SETTINGS_MODAL_SET_SECTION', settingsHandler)
  FluxDispatcher.unsubscribe('RPC_NOTIFICATION_CREATE', notifHandler)
}