(function(exports) {

"use strict";

//#region i18n/en.json
var _lang = "English";
var common = {
	"settings": "Settings",
	"plugins": "Plugins",
	"themes": "Themes",
	"enable": "Enable",
	"disable": "Disable",
	"restart": "Restart",
	"save": "Save",
	"cancel": "Cancel",
	"confirm": "Confirm",
	"open": "Open",
	"close": "Close",
	"add": "Add",
	"remove": "Remove",
	"delete": "Delete",
	"install": "Install",
	"uninstall": "Uninstall",
	"update": "Update",
	"download": "Download",
	"search": "Search",
	"loading": "Loading",
	"error": "Error",
	"success": "Success",
	"warning": "Warning",
	"info": "Info",
	"yes": "Yes",
	"no": "No",
	"ok": "OK",
	"got_it": "Got it!",
	"yes_please": "Yes please!",
	"nope": "Nope!",
	"okay": "Okay!",
	"previous": "Previous",
	"next": "Next"
};
var dorion_settings = {
	"title": "{{appName}} Settings",
	"restart_required": "Restart Required",
	"restart_warning": "Some changes require a restart to take effect.",
	"client_type": "Client Type",
	"client_type_default": "Default",
	"client_type_ptb": "PTB",
	"client_type_canary": "Canary",
	"window": "Window",
	"zoom_level": "Zoom Level",
	"sys_tray": "Minimize to System Tray",
	"sys_tray_note": "Instead of closing, {{appName}} will run in the background and will be accessible via the system tray.",
	"start_maximized": "Start Maximized",
	"startup": "Startup",
	"open_on_startup": "Open on Startup",
	"open_on_startup_note": "Open {{appName}} when your system starts.",
	"start_minimized": "Start Minimized",
	"start_minimized_note": "Open in the background when your system starts.",
	"misc": "Misc.",
	"multi_instance": "Allow Multiple Instances",
	"multi_instance_note": "Allow multiple instances of {{appName}} to be running at the same time.",
	"use_native_titlebar": "Use Native Titlebar",
	"use_native_titlebar_note": "Disable the custom titlebar and use your systems native one instead.",
	"updates": "Updates",
	"autoupdate": "Autoupdate",
	"autoupdate_note": "Automatically update various {{appName}} components, such as SpikeHD/shelter-plugins.",
	"update_notify": "Notify me of updates"
};
var dorion_plugins = {
	"title": "Client Mods & Plugins",
	"client_mods": "Client Mods",
	"plugins": "Plugins",
	"open_plugins_folder": "Open Plugins Folder",
	"open_extensions_folder": "Open Extensions Folder"
};
var dorion_themes = {
	"title": "Theme Browser",
	"theme": "Theme",
	"none": "None",
	"select_theme": "Select a theme...",
	"install_from_link": "Install Theme From Link",
	"open_folder": "Open Themes Folder",
	"sort_by": "Sort by...",
	"popular": "Popular",
	"creation_date": "Creation Date",
	"name": "Name",
	"likes": "Likes",
	"downloads": "Downloads",
	"recently_updated": "Recently Updated",
	"search_placeholder": "Search..."
};
var dorion_notifications = {
	"enable_desktop_notifications": "Enable Desktop Notifications",
	"desktop_notifications_note": "If you're looking for per-channel or per-server notifications, right-click the desired server icon and select Notification Settings.",
	"enable_unread_badge": "Enable Unread Message Badge",
	"unread_badge_note": "Shows a red badge on the app icon when you have unread messages.",
	"desktop_notifications_enabled_title": "Desktop Notifications Enabled",
	"desktop_notifications_enabled_body": "You will now receive desktop notifications!"
};
var dorion_keybinds = {
	"global_keybinds_experimental": "Global keybinds are an experimental feature!",
	"add_keybind": "Add Keybind",
	"enable_global_keybinds": "Enable Global Keybinds",
	"enable_global_keybinds_note": "Enable or disable global keybinds. Requires restart.",
	"keybinds_restart_required": "Enabling or disabling global keybinds requires a restart to take effect.",
	"restart": "Restart"
};
var dorion_updater = {
	"update_title": "{{appName}} Update",
	"update_body": "A {{appName}} update has been fetched, and {{appName}} will restart momentarily.",
	"updates_available": "Updates Available!",
	"updates_available_body": "There are {{appName}} updates available. Would you like to apply them? This notification can be disabled in {{appName}} Settings",
	"update_complete": "Update Complete!",
	"update_complete_body": "The update has been applied! Please restart to apply the changes."
};
var dorion_performance = {
	"title": "Performance & Extras",
	"cache": "Cache",
	"cache_css": "Cache CSS",
	"cache_css_note": "Save CSS to disk that would otherwise be loaded from the web, decreasing load times.",
	"auto_clear_cache": "Auto Clear Cache",
	"auto_clear_cache_note": "Clean out the web-based cache every time you close {{appName}}. This is usually cached images, scripts, and other data, and it can build up!",
	"windows_only": "This is only supported on Windows right now.",
	"optional_features": "Optional Features",
	"win7_notifications": "Alternative Notification Style",
	"win7_notifications_note": "Use the alternative notification style used on Windows 7. This is only supported on Windows.",
	"streamer_mode_detection": "Streamer Mode detection",
	"streamer_mode_detection_note": "Detect OBS and Streamlabs OBS and automatically enable streamer mode when they are running.",
	"streamer_mode_detection_requirement": "Requires the integrated RPC server and RPC process scanning to be enabled (found in the Rich Presence tab).",
	"disable_hardware_accel": "Disable Hardware Acceleration",
	"disable_hardware_accel_note": "Disable hardware acceleration, which may cause issues on some systems. Disabling this can also cause performance issues on some systems. Unsupported on macOS.",
	"enable_dorion_plugins": "Enable Dorion Plugins",
	"do_not_disable": "DO NOT DISABLE THIS OPTION.",
	"disable_plugins_note": "If you do, vital functionality will be lost. Only touch this if you know what you're doing.",
	"disable_plugins_warning": "I know the big bold \"DON'T DISABLE THIS\" text makes it really tempting to disable, but you shouldn't. {{appName}} will have several vital systems removed, such as the entire settings menu.\\n\\nThis option is intended only for debugging, development, and for running old versions of {{appName}} functionality on old versions of {{appName}}. If you're not doing that, don't touch this.",
	"absolutely_sure": "Are you ABSOLUTELY sure?",
	"blur_transparency": "Blur & Transparency",
	"blur_warning": "The blurring effect can be unreliable, semi-broken, and extremely slow, depending on what OS and version you are on. For more context, see",
	"window_vibrancy_crate": "the window-vibrancy crate",
	"blur_css": "Enable builtin background transparency CSS",
	"blur_css_note": "Enable this if you are not using a theme designed to take advantage of transparent windows.",
	"wipe_web_data": "Wipe all web-based data",
	"clear_css_cache": "Clear CSS Cache",
	"css_cache_cleared": "CSS Cache Cleared",
	"clear_web_cache_warning": "Clearing web cache will log you out and reset your settings, but can often help solve permission-based issues.\\n\\nDo you want to proceed?"
};
var dorion_rpc = {
	"title": "Rich Presence",
	"plugin": "Plugin",
	"install_shelterpc": "Install the shelteRPC plugin",
	"already_installed": "You have already installed shelteRPC!",
	"install_note": "Installing this is not mandatory, and you may use arRPC plugins (eg. through Vencord) if you'd like, but the shelteRPC plugin has specific extra features that only work in Dorion!",
	"error_installing": "Error installing shelteRPC, check the console for more information",
	"successfully_installed": "Successfully installed shelteRPC!",
	"server": "Server",
	"integrated_server": "Integrated rich presence server",
	"work_in_progress": "This is a work in progress, and won't do EVERYTHING arRPC does quite yet.",
	"integrated_server_note": "Enable the integrated RPC server, eliminating the need for a separate arRPC server running. Pairs best with",
	"also_works_with": "also works with",
	"advanced_settings": "Advanced Settings",
	"enable_process_scanner": "Enable Process Scanner",
	"process_scanner_note": "Enable this if you want {{appName}} to scan for running processes. This is the most performance-heavy component of RPC.",
	"enable_ipc_connector": "Enable IPC Connector",
	"ipc_connector_note": "Enable this if you want {{appName}} to connect to local sockets. Things such as the",
	"extension_connection": "extension use this method of connection",
	"enable_websocket_connector": "Enable Websocket Connector",
	"websocket_connector_note": "Enable this if you want {{appName}} to accept local websocket connections.",
	"enable_secondary_events": "Enable secondary events",
	"secondary_events_note": "Enable this to allow {{appName}} to properly handle server invites opened in the browser. Does not work with arRPC."
};
var dorion_profiles = {
	"title": "Profiles",
	"create_profile": "Create Profile",
	"select_profile": "Select profile...",
	"profile_name_placeholder": "Enter a name for the new profile...",
	"save_and_restart": "Save and Restart",
	"delete_profile": "Delete Selected Profile"
};
var dorion_changelog = {
	"title": "Changelog",
	"refresh": "Refresh",
	"update_available": "Update available!",
	"current_version": "Your current version is {{version}}",
	"update_to": "Update to {{version}}",
	"current": "Current",
	"latest": "Latest",
	"view_on_github": "View on GitHub"
};
var dorion_theme_card = {
	"install": "Install",
	"installed": "Installed",
	"likes": "{{count}} likes",
	"downloads": "{{count}} downloads"
};
var dorion_warning_card = {
	"restart_required": "Restart Required",
	"restart_message": "One or more settings have been changed that require a restart to take effect.",
	"restart_now": "Restart Now",
	"restart_later": "Restart Later"
};
var en_default = {
	_lang,
	common,
	dorion_settings,
	dorion_plugins,
	dorion_themes,
	dorion_notifications,
	dorion_keybinds,
	dorion_updater,
	dorion_performance,
	dorion_rpc,
	dorion_profiles,
	dorion_changelog,
	dorion_theme_card,
	dorion_warning_card
};

//#endregion
//#region plugins/dorion-helpers/i18n.ts
const languages = { en: en_default };
const initializeTranslations = () => {
	try {
		const browserLang = navigator.language?.split("-")[0] || "en";
		window.__DORION_LANG = languages[browserLang] ? browserLang : "en";
		window.__DORION_TRANSLATIONS = languages;
		console.log(`[Dorion Helpers] Initialized translations for language: ${window.__DORION_LANG}`);
	} catch (error) {
		console.warn("[Dorion Helpers] Failed to initialize translations, falling back to English:", error);
		window.__DORION_LANG = "en";
		window.__DORION_TRANSLATIONS = languages;
	}
};

//#endregion
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
const onLoad = () => {
	initializeTranslations();
	updateNotificationBadge();
};

//#endregion
exports.onLoad = onLoad
return exports;
})({});