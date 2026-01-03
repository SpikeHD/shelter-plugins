(function(exports) {

"use strict";

//#region i18n/en.json
var _lang$1 = "English";
var common$1 = {
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
	"next": "Next",
	"spikehd_shelter_plugins": "SpikeHD/shelter-plugins",
	"vscord": "VSCord",
	"arrpc": "arRPC",
	"shelterpc": "shelteRPC"
};
var dorion_settings$1 = {
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
	"autoupdate_note": "Automatically update various {{appName}} components, such as {{shelterPluginsLink}}.",
	"update_notify": "Notify me of updates"
};
var dorion_plugins$1 = {
	"title": "Client Mods & Plugins",
	"client_mods": "Client Mods",
	"plugins": "Plugins",
	"open_plugins_folder": "Open Plugins Folder",
	"open_extensions_folder": "Open Extensions Folder"
};
var dorion_themes$1 = {
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
var dorion_notifications$1 = {
	"enable_desktop_notifications": "Enable Desktop Notifications",
	"desktop_notifications_note": "If you're looking for per-channel or per-server notifications, right-click the desired server icon and select Notification Settings.",
	"enable_unread_badge": "Enable Unread Message Badge",
	"unread_badge_note": "Shows a red badge on the app icon when you have unread messages.",
	"desktop_notifications_enabled_title": "Desktop Notifications Enabled",
	"desktop_notifications_enabled_body": "You will now receive desktop notifications!"
};
var dorion_keybinds$1 = {
	"global_keybinds_experimental": "Global keybinds are an experimental feature!",
	"add_keybind": "Add Keybind",
	"enable_global_keybinds": "Enable Global Keybinds",
	"enable_global_keybinds_note": "Enable or disable global keybinds. Requires restart.",
	"keybinds_restart_required": "Enabling or disabling global keybinds requires a restart to take effect.",
	"restart": "Restart"
};
var dorion_updater$1 = {
	"update_title": "{{appName}} Update",
	"update_body": "A {{appName}} update has been fetched, and {{appName}} will restart momentarily.",
	"updates_available": "Updates Available!",
	"updates_available_body": "There are {{appName}} updates available. Would you like to apply them? This notification can be disabled in {{appName}} Settings",
	"update_complete": "Update Complete!",
	"update_complete_body": "The update has been applied! Please restart to apply the changes."
};
var dorion_performance$1 = {
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
	"disable_plugins_warning": "I know the big bold \"DON'T DISABLE THIS\" text makes it really tempting to disable, but you shouldn't. {{appName}} will have several vital systems removed, such as the entire settings menu.\n\nThis option is intended only for debugging, development, and for running old versions of {{appName}} functionality on old versions of {{appName}}. If you're not doing that, don't touch this.",
	"absolutely_sure": "Are you ABSOLUTELY sure?",
	"blur_transparency": "Blur & Transparency",
	"blur_warning": "The blurring effect can be unreliable, semi-broken, and extremely slow, depending on what OS and version you are on. For more context, see {{windowVibrancyLink}}",
	"window_vibrancy_crate": "the window-vibrancy crate",
	"blur_css": "Enable builtin background transparency CSS",
	"blur_css_note": "Enable this if you are not using a theme designed to take advantage of transparent windows.",
	"wipe_web_data": "Wipe all web-based data",
	"clear_css_cache": "Clear CSS Cache",
	"css_cache_cleared": "CSS Cache Cleared",
	"clear_web_cache_warning": "Clearing web cache will log you out and reset your settings, but can often help solve permission-based issues.\n\nDo you want to proceed?"
};
var dorion_rpc$1 = {
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
	"integrated_server_note": "Enable the integrated RPC server, eliminating the need for a separate arRPC server running. Pairs best with {{shelteRPCLink}}, also works with {{arRPCLink}}.",
	"advanced_settings": "Advanced Settings",
	"enable_process_scanner": "Enable Process Scanner",
	"process_scanner_note": "Enable this if you want {{appName}} to scan for running processes. This is the most performance-heavy component of RPC.",
	"enable_ipc_connector": "Enable IPC Connector",
	"ipc_connector_note": "Enable this if you want {{appName}} to connect to local sockets. Things such as the {{vscordLink}} extension use this method of connection",
	"enable_websocket_connector": "Enable Websocket Connector",
	"websocket_connector_note": "Enable this if you want {{appName}} to accept local websocket connections.",
	"enable_secondary_events": "Enable secondary events",
	"secondary_events_note": "Enable this to allow {{appName}} to properly handle server invites opened in the browser. Does not work with arRPC."
};
var dorion_profiles$1 = {
	"title": "Profiles",
	"create_profile": "Create Profile",
	"select_profile": "Select profile...",
	"profile_name_placeholder": "Enter a name for the new profile...",
	"save_and_restart": "Save and Restart",
	"delete_profile": "Delete Selected Profile"
};
var dorion_changelog$1 = {
	"title": "Changelog",
	"refresh": "Refresh",
	"update_available": "Update available!",
	"current_version": "Your current version is {{version}}",
	"update_to": "Update to {{version}}",
	"current": "Current",
	"latest": "Latest",
	"view_on_github": "View on GitHub"
};
var dorion_theme_card$1 = {
	"install": "Install",
	"installed": "Installed",
	"likes": "{{count}} likes",
	"downloads": "{{count}} downloads"
};
var dorion_warning_card$1 = {
	"restart_required": "Restart Required",
	"restart_message": "One or more settings have been changed that require a restart to take effect.",
	"restart_now": "Restart Now",
	"restart_later": "Restart Later"
};
var en_default = {
	_lang: _lang$1,
	common: common$1,
	dorion_settings: dorion_settings$1,
	dorion_plugins: dorion_plugins$1,
	dorion_themes: dorion_themes$1,
	dorion_notifications: dorion_notifications$1,
	dorion_keybinds: dorion_keybinds$1,
	dorion_updater: dorion_updater$1,
	dorion_performance: dorion_performance$1,
	dorion_rpc: dorion_rpc$1,
	dorion_profiles: dorion_profiles$1,
	dorion_changelog: dorion_changelog$1,
	dorion_theme_card: dorion_theme_card$1,
	dorion_warning_card: dorion_warning_card$1
};

//#endregion
//#region i18n/ru.json
var _lang = "Русский";
var common = {
	"settings": "Настройки",
	"plugins": "Плагины",
	"themes": "Темы",
	"enable": "Включить",
	"disable": "Отключить",
	"restart": "Перезапустить",
	"save": "Сохранить",
	"cancel": "Отмена",
	"confirm": "Подтвердить",
	"open": "Открыть",
	"close": "Закрыть",
	"add": "Добавить",
	"remove": "Убрать",
	"delete": "Удалить",
	"install": "Установить",
	"uninstall": "Удалить",
	"update": "Обновить",
	"download": "Скачать",
	"search": "Поиск",
	"loading": "Загрузка",
	"error": "Ошибка",
	"success": "Готово",
	"warning": "Внимание",
	"info": "Информация",
	"yes": "Да",
	"no": "Нет",
	"ok": "OK",
	"got_it": "Понятно!",
	"yes_please": "Да, пожалуйста!",
	"nope": "Не-а!",
	"okay": "Хорошо!",
	"previous": "Предыдущая",
	"next": "Следующая",
	"spikehd_shelter_plugins": "SpikeHD/shelter-plugins",
	"vscord": "VSCord",
	"arrpc": "arRPC",
	"shelterpc": "shelteRPC"
};
var dorion_settings = {
	"title": "Настройки {{appName}}",
	"restart_required": "Требуется перезапуск",
	"restart_warning": "Для вступления в силу некоторых изменений требуется перезагрузка.",
	"client_type": "Тип клиента",
	"client_type_default": "По умолчанию",
	"client_type_ptb": "PTB",
	"client_type_canary": "Canary",
	"window": "Окно",
	"zoom_level": "Уровень масштабирования",
	"sys_tray": "Свернуть в системный трей",
	"sys_tray_note": "Вместо закрытия {{appName}} будет работать в фоновом режиме и будет доступен через панель задач.",
	"start_maximized": "Запускать в развёрнутом окне",
	"startup": "Запуск",
	"open_on_startup": "Открывать при включении ПК",
	"open_on_startup_note": "Открывать {{appName}} при запуске системы.",
	"start_minimized": "Запускать свёрнутым",
	"start_minimized_note": "Открывать в фоновом режиме при запуске системы.",
	"misc": "Разное",
	"multi_instance": "Разрешить несколько экземпляров",
	"multi_instance_note": "Разрешить одновременный запуск нескольких экземпляров {{appName}}.",
	"use_native_titlebar": "Использовать встроенную строку заголовка",
	"use_native_titlebar_note": "Отключить пользовательскую строку заголовка и использовать встроенную в систему.",
	"updates": "Обновления",
	"autoupdate": "Автообновление",
	"autoupdate_note": "Автоматическое обновление различных компонентов {{appName}}, таких как {{shelterPluginsLink}}.",
	"update_notify": "Уведомлять меня об обновлениях"
};
var dorion_plugins = {
	"title": "Клиентские модификации и плагины",
	"client_mods": "Клиентские модификации",
	"plugins": "Плагины",
	"open_plugins_folder": "Открыть папку плагинов",
	"open_extensions_folder": "Открыть папку расширений"
};
var dorion_themes = {
	"title": "Браузер тем",
	"theme": "Тема",
	"none": "Нет",
	"select_theme": "Выберите тему...",
	"install_from_link": "Установить тему по ссылке",
	"open_folder": "Открыть папку тем",
	"sort_by": "Сортировать по...",
	"popular": "Популярности",
	"creation_date": "Дате создания",
	"name": "Названию",
	"likes": "Отметкам «Нравится»",
	"downloads": "Скачиваниям",
	"recently_updated": "Недавно обновлённым",
	"search_placeholder": "Поиск..."
};
var dorion_notifications = {
	"enable_desktop_notifications": "Включить уведомления на рабочем столе",
	"desktop_notifications_note": "Если вам нужны уведомления для каждого канала или сервера, щёлкните правой кнопкой мыши по значку нужного сервера и выберите «Параметры уведомлений».",
	"enable_unread_badge": "Включить значок непрочитанного сообщения",
	"unread_badge_note": "При наличии непрочитанных сообщений на значке приложения отображается красный значок.",
	"desktop_notifications_enabled_title": "Уведомления на рабочем столе включены",
	"desktop_notifications_enabled_body": "Теперь вы будете получать уведомления на рабочий стол!"
};
var dorion_keybinds = {
	"global_keybinds_experimental": "Глобальные горячие клавиши — экспериментальная функция!",
	"add_keybind": "Добавить горячую клавишу",
	"enable_global_keybinds": "Включить глобальные горячие клавиши",
	"enable_global_keybinds_note": "Включите или отключите глобальные горячие клавиши. Требует перезагрузки.",
	"keybinds_restart_required": "Чтобы глобальные горячие клавиши вступили в силу, необходимо перезагрузить программу.",
	"restart": "Перезапустить"
};
var dorion_updater = {
	"update_title": "Обновление {{appName}}",
	"update_body": "Загружено обновление {{appName}}, и {{appName}} будет перезапущен в ближайшее время.",
	"updates_available": "Доступно обновление!",
	"updates_available_body": "Доступны обновления {{appName}}. Хотите их установить? Это уведомление можно отключить в настройках {{appName}}",
	"update_complete": "Обновление завершено!",
	"update_complete_body": "Обновление установлено! Для применения изменений перезагрузите программу."
};
var dorion_performance = {
	"title": "Производительность и дополнительное",
	"cache": "Кеш",
	"cache_css": "Кеширование CSS",
	"cache_css_note": "Сохраняйте CSS-файлы на диск, чтобы они не загружались из Интернета, что сократит время загрузки.",
	"auto_clear_cache": "Автоочистка кеша",
	"auto_clear_cache_note": "Очищать веб-кеш каждый раз, когда закрываете {{appName}}. Обычно в кеше хранятся изображения, скрипты и другие данные, и их может накапливаться много!",
	"windows_only": "На данный момент эта функция поддерживается только в Windows.",
	"optional_features": "Необязательные функции",
	"win7_notifications": "Альтернативный стиль уведомления",
	"win7_notifications_note": "Использовать альтернативный стиль уведомлений, который используется в Windows 7. Он поддерживается только в Windows.",
	"streamer_mode_detection": "Обнаружение режима стримера",
	"streamer_mode_detection_note": "Обнаруживает OBS и Streamlabs OBS и автоматически включает режим стримера при их запуске.",
	"streamer_mode_detection_requirement": "Требуется включить встроенный сервер RPC и сканирование процессов RPC (находится на вкладке «Расширенные статусы»).",
	"disable_hardware_accel": "Отключить аппаратное ускорение",
	"disable_hardware_accel_note": "Отключение аппаратного ускорения, которое может вызывать проблемы в некоторых системах. Также может привести к снижению производительности в некоторых системах. Не поддерживается в macOS.",
	"enable_dorion_plugins": "Включить плагины Dorion",
	"do_not_disable": "НЕ ОТКЛЮЧАЙТЕ ЭТОТ ПАРАМЕТР.",
	"disable_plugins_note": "Если вы это сделаете, важные функции будут потеряны. Прикасайтесь к ним только в том случае, если знаете, что делаете.",
	"disable_plugins_warning": "Я знаю, что большой, выделенный жирным шрифтом текст «НЕ ОТКЛЮЧАЙТЕ ЭТО» вызывает большой соблазн отключить его, но вы не должны этого делать. Из {{appName}} будут удалены несколько важных систем, таких как всё меню настроек.\n\nЭтот параметр предназначен только для отладки, разработки и запуска старых версий функциональности {{appName}} в старых версиях {{appName}}. Если вы этого не делаете, не трогайте это.",
	"absolutely_sure": "Вы СОВЕРШЕННО уверены?",
	"blur_transparency": "Размытие и прозрачность",
	"blur_warning": "Эффект размытия может быть ненадёжным, неполноценным и чрезвычайно медленным, в зависимости от того, на какой операционной системе и в какой версии вы работаете. Более подробную информацию смотрите в {{windowVibrancyLink}}",
	"window_vibrancy_crate": "библиотеке window-vibrancy",
	"blur_css": "Включить встроенную прозрачность фона CSS",
	"blur_css_note": "Включите это, если вы не используете тему, предназначенную для использования преимуществ прозрачных окон.",
	"wipe_web_data": "Удалить все веб-данные",
	"clear_css_cache": "Очистить кеш CSS",
	"css_cache_cleared": "Кеш CSS очищен",
	"clear_web_cache_warning": "Очистка веб-кеша приведёт к выходу пользователя из системы и сбросу настроек, но часто может помочь решить проблемы, связанные с правами доступа.\n\nВы хотите продолжить?"
};
var dorion_rpc = {
	"title": "Расширенные статусы",
	"plugin": "Плагин",
	"install_shelterpc": "Установить плагин shelteRPC",
	"already_installed": "Вы уже установили shelteRPC!",
	"install_note": "Установка этого не обязательна, и вы можете использовать плагины arRPC (например, через Vencord), если хотите, но плагин shelteRPC имеет специальные дополнительные функции, которые работают только в Dorion!",
	"error_installing": "Ошибка при установке shelteRPC, проверьте консоль для получения дополнительной информации",
	"successfully_installed": "Успешно установлен shelteRPC!",
	"server": "Сервер",
	"integrated_server": "Встроенный сервер расширенных статусов",
	"work_in_progress": "Ещё в разработке, и пока не будет выполнять ВСЁ, что делает arRPC.",
	"integrated_server_note": "Включить встроенный сервер RPC, что устранит необходимость в отдельном сервере arRPC. Лучше всего сочетается с {{shelteRPCLink}}, также работает с {{arRPCLink}}.",
	"advanced_settings": "Расширенные настройки",
	"enable_process_scanner": "Включить сканер процессов",
	"process_scanner_note": "Включите этот параметр, если хотите, чтобы {{appName}} сканировал запущенные процессы. Это самый ресурсоёмкий компонент RPC.",
	"enable_ipc_connector": "Включить соединитель IPC",
	"ipc_connector_note": "Включите этот параметр, если хотите, чтобы {{appName}} подключался к локальным сокетам. Такие компоненты, как расширение {{vscordLink}}, использующее этот метод подключения",
	"enable_websocket_connector": "Включить соединитель веб-сокета",
	"websocket_connector_note": "Включите этот параметр, если хотите, чтобы {{appName}} принимал локальные соединения веб-сокета.",
	"enable_secondary_events": "Включить вторичные события",
	"secondary_events_note": "Включите этот параметр, чтобы {{appName}} мог правильно обрабатывать приглашения сервера, открытые в браузере. Не работает с arRPC."
};
var dorion_profiles = {
	"title": "Профили",
	"create_profile": "Создать профиль",
	"select_profile": "Выбрать профиль...",
	"profile_name_placeholder": "Введите имя нового профиля...",
	"save_and_restart": "Сохранить и перезапустить",
	"delete_profile": "Удалить выбранный профиль"
};
var dorion_changelog = {
	"title": "Список изменений",
	"refresh": "Обновить",
	"update_available": "Доступно обновление!",
	"current_version": "Ваша текущая версия: {{version}}",
	"update_to": "Обновиться до {{version}}",
	"current": "Текущая",
	"latest": "Последняя",
	"view_on_github": "Просмотреть на GitHub"
};
var dorion_theme_card = {
	"install": "Установить",
	"installed": "Установлена",
	"likes": "{{count}} отметок «Нравится»",
	"downloads": "{{count}} скачиваний"
};
var dorion_warning_card = {
	"restart_required": "Требуется перезапуск",
	"restart_message": "Были изменены один или несколько параметров, для вступления которых в силу требуется перезапуск.",
	"restart_now": "Перезапустить сейчас",
	"restart_later": "Перезапустить позже"
};
var ru_default = {
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
const languages = {
	en: en_default,
	ru: ru_default
};
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