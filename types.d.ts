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
  client_plugins: boolean;
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

interface Backend {
  name: string
  invoke: (name: string, args?: any) => Promise<any>
  event: {
    emit: (name: string, args?: any) => void
    listen: (name: string, cb: (args: any) => void) => Promise<void>
  }
  app: {
    getVersion: () => string
  }
  process: {
    relaunch: () => void
  }
  apiWindow: {
    appWindow: {
      setFullscreen: (isFullscreen: boolean) => void
    }
  }
}

interface KeyStruct {
  name: string
  code: string
}

interface Keybind {
  key: string
  keys: KeyStruct[]
}

interface KeybindActionType {
  label: string
  value: string
}

interface KeybindDescription {
  [key: string]: string
}

interface KeybindActionsInternal {
  [key: string]: {
    storeValue?: {
      store: string
      key: string
      eventKey: string
      modify: (event: any, store: any) => any
    }
    press?: {
      [key: string]: any
    }[]
    release?: {
      [key: string]: any
    }[]
  }
}