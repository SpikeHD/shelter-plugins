const {
  flux: {
    dispatcher,
  },
  ui: {
    SwitchItem,
  },
  plugin: {
    store,
  }
} = shelter

const isMac = navigator.userAgent.includes('Mac OS X')

// @ts-expect-error this is defined (sometimes)
if (window?.Vencord?.Plugins?.plugins?.WebKeybinds?.started) {
  throw new Error('Web Keybinds: plugin incompatibility (cannot run Vencord WebKeybinds alongside shelter Web Keybinds)')
}

const handleKeyDown = (e: KeyboardEvent) => {
  const ctrl = e.ctrlKey || (isMac && e.metaKey)
  const key = e.key.toLowerCase()

  if (!ctrl) return

  switch(key) {
  case 't':
    if (!store.desktopOnlyKeybinds) return
    e.preventDefault()

    if (e.shiftKey) {
      // TODO open @me and the DM creation panel
      return
    }

    dispatcher.dispatch({
      type: 'QUICKSWITCHER_SHOW',
      query: '',
      queryMode: null,
    })

    break

  case 'tab':
    if (!store.desktopOnlyKeybinds) return
    e.preventDefault()

    // TODO handle guild selection prev/next
    break

  case ',':
    e.preventDefault()

    dispatcher.dispatch({
      'type': 'USER_SETTINGS_MODAL_OPEN',
      'section': 'My Account',
      'subsection': null,
      'openWithoutBackstack': false
    })

    dispatcher.dispatch({
      type: 'LAYER_PUSH',
      component: 'USER_SETTINGS'
    })
    break

  default:
    // TODO implement numbered keybinds
    break
  }
}

document.addEventListener('keydown', handleKeyDown)

export const onUnload = () => {
  document.removeEventListener('keydown', handleKeyDown)
}

export const settings = () => (
  <>
    <SwitchItem
      value={store.desktopOnlyKeybinds}
      onChange={(v) => {
        store.desktopOnlyKeybinds = v
      }}
      note="Enable keybinds that would otherwise interfere with browser keybinds. Intended for use in custom clients."
    >
      Desktop-only Keybinds
    </SwitchItem>
  </>
)
