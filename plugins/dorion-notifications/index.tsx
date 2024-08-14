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
} = shelter

const [settings, setSettings] = createSignal<DorionSettings>(null)
const notifSelector = 'div[class*="contentColumn"] div[class*="container"]'

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

  // Wait for notif tab to load
  await window.Dorion.util.waitForElm('#notifications-tab')

  const node = document.querySelector(notifSelector) as HTMLElement

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

          // If enabling, dispatch the flux event as well
          FluxDispatcher.dispatch({
            type: 'NOTIFICATIONS_SET_PERMISSION_STATE',
            enabled: value ? 'ENABLED' : 'DISABLED'
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
}

FluxDispatcher.subscribe('USER_SETTINGS_MODAL_SET_SECTION', settingsHandler)

export const onLoad = async () => {
  const cfg = JSON.parse(await invoke('read_config_file'))
  setSettings(cfg)
  
  if (cfg.desktop_notifications) {
    Notification.requestPermission()
  }
}

export const onUnload = () => {
  FluxDispatcher.unsubscribe('USER_SETTINGS_MODAL_SET_SECTION', settingsHandler)
}