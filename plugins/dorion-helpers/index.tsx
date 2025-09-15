const {
  flux: {
    stores: {
      GuildReadStateStore,
      RelationshipStore,
    }
  },
} = shelter

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

  if (!total && unread) invoke('notification_count', { amount: -1 })

  invoke('notification_count', { amount: total })
}

// @ts-expect-error cry
GuildReadStateStore.addChangeListener(updateNotificationBadge)
// @ts-expect-error cry
RelationshipStore.addChangeListener(updateNotificationBadge)
