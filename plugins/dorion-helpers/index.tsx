import { initializeTranslations } from './i18n.js'

const {
  flux: {
    stores: {
      GuildReadStateStore,
      RelationshipStore,
    }
  },
} = shelter

export function createLocalStorage() {
  const iframe = document.createElement('iframe')

  // Wait for document.head to exist, then append the iframe
  const interval = setInterval(() => {
    if (!document.head || window.localStorage) return

    document.head.append(iframe)
    const pd = Object.getOwnPropertyDescriptor(iframe.contentWindow, 'localStorage')
    iframe.remove()

    if (!pd) return

    Object.defineProperty(window, 'localStorage', pd)

    console.log('[Dorion Helpers] Done creating localStorage!')

    clearInterval(interval)
  }, 50)
}

// https://github.com/Vencord/Vesktop/blob/497c251d722d1feab0d703840114c64db82ebb99/src/renderer/appBadge.ts#L16
const updateNotificationBadge = () => {
  if (!window?.Dorion?.shouldShowUnreadBadge) return

  // @ts-expect-error cry
  const { invoke } = window.__TAURI__.core

  // @ts-expect-error cry
  const unread = GuildReadStateStore.hasAnyUnread()
  // @ts-expect-error cry
  const mentions = GuildReadStateStore.getTotalMentionCount()
  // @ts-expect-error cry
  const friendRequests = RelationshipStore.getPendingCount()
  const total = friendRequests + mentions

  const amount = !total && unread ? -1 : total
  invoke('notification_count', { amount })
}

export const onLoad = () => {
  createLocalStorage()
  initializeTranslations()
  updateNotificationBadge()

  // @ts-expect-error cry
  GuildReadStateStore.addChangeListener(updateNotificationBadge)
  // @ts-expect-error cry
  RelationshipStore.addChangeListener(updateNotificationBadge)
}
