import { api, invoke } from '../../api/api.js'
import { t } from '../../util/i18n.js'

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
        note={t('dorion_notifications.desktop_notifications_note')}
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
              title: t('dorion_notifications.desktop_notifications_enabled_title'),
              body: t('dorion_notifications.desktop_notifications_enabled_body'),
              icon: '',
            })
          }
        }}
      >
        {t('dorion_notifications.enable_desktop_notifications')}
      </SwitchItem>,
      <SwitchItem
        note={t('dorion_notifications.unread_badge_note')}
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
          {t('dorion_notifications.enable_unread_badge')}
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

  const { title, body, icon, message } = payload

  invoke('send_notification', {
    title,
    body,
    icon,
    additionalData: {
      guild_id: message?.guild_id || null,
      channel_id: message?.channel_id || null,
      message_id: message?.id || null,
    },
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
