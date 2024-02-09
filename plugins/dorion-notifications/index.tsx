import { api, invoke } from '../../api/api.js'

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

const [settings, setSettings] = createSignal<DorionSettings>(null)
const notifSelector = 'div[class*="contentColumn"] div[class*="container"]'

// Overwrite the default window.Notification function
const unpatchNotif = patcher.instead('Notification', window, () => {
  return
})

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

    // The next node after should also be hidden
    const next = node.nextElementSibling as HTMLDivElement
    if (next) next.style.display = 'none'

    if (newSettingInjected) return

    const newNotifs = [
      (
        <SwitchItem
          note="Shows a red badge on the app icon when you have unread messages."
          value={settings()?.unread_badge}
          onChange={async (value) => {
            setSettings({
              ...settings(),
              unread_badge: value
            })
  
            await invoke('write_config_file', {
              contents: JSON.stringify(settings())
            })
  
            api.shouldShowUnreadBadge = value

            // Also wipe the current badge if it was enabled
            if (!value) invoke('notif_count', { amount: 0 })
            else api.util.applyNotificationCount()
          }}
        >
            Enable Unread Message Badge
        </SwitchItem>
      ),
      (
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
    ]

    for (const newNotif of newNotifs) {
      node.parentElement.prepend(newNotif)
    }

    newSettingInjected = true
  })
}

const notifHandler = (payload) => {
  if (!settings().desktop_notifications) return

  invoke('send_notification', {
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
  unpatchNotif()
}