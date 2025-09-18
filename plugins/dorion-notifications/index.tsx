import { api, invoke } from '../../api/api.js'

const {
  ui: {
    SwitchItem,
    ReactiveRoot
  },
  flux: {
    dispatcher: FluxDispatcher
  },
  solid: {
    createSignal,
  },
  observeDom,
} = shelter

const [settings, setSettings] = createSignal<DorionSettings>(null)

let child: Element = null

const settingsHandler = (payload) => {
  if (payload.section !== 'Notifications') {
    if (child) {
      child.remove()
      child = null
    }
    return
  }

  const unsub = observeDom('#notifications-tab', () => {
    unsub()

    const notifSelector = 'div[class*="contentColumn"] div[class*="container"]'
    const node = document.querySelector(notifSelector) as HTMLElement

    if (!node) return

    // Hide the original notification settings
    node.style.display = 'none'

    // The next node after should also be hidden
    const next = node.nextElementSibling as HTMLDivElement
    if (next) next.style.display = 'none'

    const NotificationSettings = () => [
      <SwitchItem
        note="If you're looking for per-channel or per-server notifications, right-click the desired server icon and select Notification Settings."
        value={settings()?.desktop_notifications}
        onChange={(value) => {
          setSettings({
            ...settings(),
            desktop_notifications: value
          })

          // If enabling, dispatch the flux event as well
          FluxDispatcher.dispatch({
            type: 'NOTIFICATIONS_SET_PERMISSION_STATE',
            enabled: value ? 'ENABLED' : 'DISABLED'
          })

          invoke('write_config_file', {
            contents: JSON.stringify(settings())
          })

          if (value) {
            invoke('send_notification', {
              title: 'Desktop Notifications Enabled',
              body: 'You will now receive desktop notifications!',
              icon: '',
            })
          }
        }}
      >
        Enable Desktop Notifications
      </SwitchItem>,
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
      </SwitchItem>,
    ]

    child = node.parentElement.insertBefore(
      <ReactiveRoot>
        <NotificationSettings />
      </ReactiveRoot>,
      node.parentElement.firstChild
    )
  })
}

const notifHandler = (payload) => {
  // @ts-expect-error this is added by Dorion
  if (!settings()?.desktop_notifications || !window.Notification?.__IS_STUBBED__) return

  const { title, body, icon } = payload

  invoke('send_notification', {
    title,
    body,
    icon,
  })
}

FluxDispatcher.subscribe('USER_SETTINGS_MODAL_SET_SECTION', settingsHandler)
FluxDispatcher.subscribe('RPC_NOTIFICATION_CREATE', notifHandler)

export const onLoad = async () => {
  const cfg = JSON.parse(await invoke('read_config_file'))
  setSettings(cfg)
  
  if (cfg.desktop_notifications) {
    Notification.requestPermission()
  }
}

export const onUnload = () => {
  FluxDispatcher.unsubscribe('USER_SETTINGS_MODAL_SET_SECTION', settingsHandler)
  FluxDispatcher.unsubscribe('RPC_NOTIFICATION_CREATE', notifHandler)
}