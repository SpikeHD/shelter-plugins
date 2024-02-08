interface DorionSettings {
  theme: string;
  zoom: string;
  client_type: string;
  sys_tray: boolean;
  push_to_talk: boolean;
  push_to_talk_keys: string[];
  cache_css: boolean;
  use_native_titlebar: boolean;
  start_maximized: boolean;
  profile: string;
  streamer_mode_detection: boolean;
  rpc_server: boolean;
  open_on_startup: boolean;
  startup_minimized: boolean;
  autoupdate: boolean;
  update_notify: boolean;
  desktop_notifications: boolean;
  auto_clear_cache: boolean;
  multi_instance: boolean;
  disable_hardware_accel: boolean;
  blur: string;
  blur_css: boolean;
  client_mods: string[];
  unread_badge: boolean;
  dorion_plugins: boolean;
}

interface DorionTheme {
  label: string
  value: string
}

interface DorionPluginList {
  // Key is the filename
  [key: string]: {
    name: string
    preload: boolean
    enabled: boolean
  }
}

interface ShelteRPCPreviouslyPlayed {
  name: string
  lastPlayed: number
  hide: boolean
  local?: boolean
  appid: string
}

interface ShelteRPCStore {
  currentlyPlaying: string
  previouslyPlayed: ShelteRPCPreviouslyPlayed[]
}

interface ProcessWindow {
  title: string
  pid: string
  process_name: string
}

interface ConfirmationModalProps {
  header: string
  body: string
  confirmText: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  type?: 'neutral' | 'danger' | 'warning'
}
