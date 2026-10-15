import { api, invoke } from '../../api/api.js'
import { t } from '../../util/i18n.js'

const {
  flux: {
    dispatcher: FluxDispatcher
  },
  solid: {
    createSignal,
  },
} = shelter

const [settings, setSettings] = createSignal<DorionSettings>(null)

const saveSettings = async (patch: Record<string, boolean>) => {
  try {
    const cfg = JSON.parse(await invoke('read_config_file'))

    if (Object.keys(patch).every(k => cfg[k] === patch[k])) return false

    const next = { ...cfg, ...patch }

    await invoke('write_config_file', {
      contents: JSON.stringify(next)
    })

    setSettings(next)

    return true
  } catch (e) {
    console.error('[Dorion Notifications] Failed to save settings', e)
    return false
  }
}

const desktopTypeHandler = async (payload) => {
  const enabled = payload.desktopType !== 'NEVER'

  if (!await saveSettings({ desktop_notifications: enabled })) return

  FluxDispatcher.dispatch({
    type: 'NOTIFICATIONS_SET_PERMISSION_STATE',
    enabled: enabled ? 'ENABLED' : 'DISABLED'
  })

  if (enabled) {
    invoke('send_notification', {
      title: t('dorion_notifications.desktop_notifications_enabled_title'),
      body: t('dorion_notifications.desktop_notifications_enabled_body'),
      icon: '',
    })
  }
}

const unreadBadgeHandler = async (payload) => {
  const enabled = !payload.disableUnreadBadge

  if (!await saveSettings({ unread_badge: enabled })) return

  api.shouldShowUnreadBadge = enabled

  if (!enabled) invoke('notif_count', { amount: 0 })
  else api.util.applyNotificationCount()
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

FluxDispatcher.subscribe('NOTIFICATIONS_SET_DESKTOP_TYPE', desktopTypeHandler)
FluxDispatcher.subscribe('NOTIFICATIONS_SET_DISABLE_UNREAD_BADGE', unreadBadgeHandler)
FluxDispatcher.subscribe('RPC_NOTIFICATION_CREATE', notifHandler)

export const onLoad = async () => {
  const cfg = JSON.parse(await invoke('read_config_file'))
  setSettings(cfg)

  if (cfg.desktop_notifications) {
    Notification.requestPermission()
  }
}

export const onUnload = () => {
  FluxDispatcher.unsubscribe('NOTIFICATIONS_SET_DESKTOP_TYPE', desktopTypeHandler)
  FluxDispatcher.unsubscribe('NOTIFICATIONS_SET_DISABLE_UNREAD_BADGE', unreadBadgeHandler)
  FluxDispatcher.unsubscribe('RPC_NOTIFICATION_CREATE', notifHandler)
}
