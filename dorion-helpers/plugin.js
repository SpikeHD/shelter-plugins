(function() {

"use strict";

//#region plugins/dorion-helpers/index.tsx
const { flux: { stores: { GuildReadStateStore, RelationshipStore } } } = shelter;
const updateNotificationBadge = () => {
	if (!window?.Dorion?.shouldShowUnreadBadge) return;
	const { invoke } = window.__TAURI__.core;
	const unread = GuildReadStateStore.hasAnyUnread();
	const mentions = GuildReadStateStore.getTotalMentionCount();
	const friendRequests = RelationshipStore.getPendingCount();
	const total = friendRequests + mentions;
	if (!total && unread) invoke("notification_count", { amount: -1 });
	invoke("notification_count", { amount: total });
};
GuildReadStateStore.addChangeListener(updateNotificationBadge);
RelationshipStore.addChangeListener(updateNotificationBadge);
updateNotificationBadge();

//#endregion
})();