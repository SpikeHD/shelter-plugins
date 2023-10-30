const {
  ui: {
    SwitchItem
  },
  util: {
    sleep
  },
  flux: {
    stores,
    dispatcher: FluxDispatcher
  },
  observeDom,
  patcher
} = shelter

const { invoke } = (window as any).__TAURI__

const settingsRootSelector = 'div[class*="contentColumn"] div[class*="children"]'
const notifSelector = 'div[class*="contentColumn"] div[class*="container"]'

FluxDispatcher.subscribe('USER_SETTINGS_MODAL_SET_SECTION', async (payload) => {
  if (payload.section !== 'Notifications') return

  const settings: DorionSettings = JSON.parse(await invoke('read_config_file'))

  const unobserve = observeDom(notifSelector, (node: HTMLDivElement) => {
    unobserve.now()

    node.style.display = 'none'
  
    const newNotifElm = (
      <SwitchItem
        value={settings.desktop_notifications}
        onChange={(v) => {
          settings.desktop_notifications = v

          // Save the settings
          invoke('write_config_file', {
            contents: JSON.stringify(settings)
          })
        }}
        note="If you're looking for per-channel or per-server notifications, right-click the desired server icon and select Notification Settings."
        style={{ marginTop: '16px' }}
      >
        Enable Desktop Notifications
      </SwitchItem>
    )
  
    const settingsRoot = document.querySelector(settingsRootSelector)
    settingsRoot.prepend(newNotifElm)
  })
})

FluxDispatcher.subscribe('RPC_NOTIFICATION_CREATE', async (payload) => {
  await invoke('send_notification', {
    icon: payload.icon,
    title: payload.title,
    body: payload.body
  })
})

export const onUnload = () => {

}