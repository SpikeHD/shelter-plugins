const {
  plugin: {
    store
  },
  ui: {
    SwitchItem
  }
} = shelter

const components = [
  // user effects
  {
    name: 'Nitro usernames',
    description: 'Removes the fancy username effects from users that have them enabled',
    rules: `
      div:has(> span[data-username-with-effects]) { all: unset !important; }
      span[data-username-with-effects] { all: unset !important; }
      span[class*=dnsFont] { all: unset !important; }
    `
  },
  {
    name: 'Nitro avatar decorations',
    description: 'Removes the member list and profile card avatar decoration from users that have them enabled',
    rules: `
      img[class*=avatarDecoration] { display: none !important; }
      svg[class*=avatarDecoration] { display: none !important; }
    `
  },
  {
    name: 'Nitro member backgrounds',
    description: 'Removes the member list background effects from users that have them enabled',
    // nameplated - members list
    // interactive - DMs list
    rules: `
      div[class*=nameplated] > div[class*=container] { display: none !important; }
      div[class*=interactive] > div[class*=container] { display: none !important; }
    `
  },
  {
    name: 'Nitro profile effects',
    description: 'Removes the profile card effects from users that have them enabled',
    rules: `
      div[class*=profileEffects] { display: none !important; }
    `
  },

  // home page
  {
    name: 'Active Now section',
    description: 'Removes the "Active Now" section from the home page',
    rules: `
      div[class*="nowPlayingColumn"] { display: none; }
    `
  },
  {
    name: 'Nitro tab',
    description: 'Removes the "Nitro" tab from the home page',
    rules: `
      a[href="/store"] { display: none; }
    `
  },
  {
    name: 'Store tab',
    description: 'Removes the "Store" tab from the home page',
    rules: `
      a[href="/shop"] { display: none; }
    `
  },
  {
    name: 'Quests tab',
    description: 'Removes the "Quests" tab from the home page',
    rules: `
      a[href="/quest-home"] { display: none; }
    `
  },

  // chat area
  {
    name: 'Apps button',
    description: 'Removes the Apps button from the text area',
    rules: `
      div[class*="app-launcher-entrypoint"] { display: none; }
    `
  },
  {
    name: 'Gift button',
    description: 'Removes the gift button in the chat bar',
    rules: `
      div[class*="sansAttachButton"] > div[class*="buttons"] > div[class*="-container"] {
        display: none;
      }
    `
  },
  {
    name: 'Server boost bar',
    description: 'Removes the server boost bar',
    rules: `
      div[data-list-item-id^="channels___skill-"] ~ div { display: none; }
      div[class*="containerWithMargin"][role="button"] { display: none; }
    `
  },

  // misc
  {
    name: 'Quest popout',
    description: 'Removes the Nitro quest popup',
    rules: `
      div[class*="questPromoContent"] { display: none; }
    `
  }
]

const style = document.createElement('style')
style.id = 'clean-home-style'

const styleElm = document.body.appendChild(style)

const setStyle = () => {
  styleElm.textContent = components
    .filter(c => store[c.name])
    .map(c => c.rules)
    .join(' ')
}

// Initial call when we load
setStyle()

// If this is the first time it's ever been loaded, enable everything and send a toast
if (Object.keys(store).length === 0) {
  components.forEach(c => {
    store[c.name] = true
  })
  setStyle()

  shelter.ui.showToast({
    title: 'Declutter',
    content: 'All component removals have been enabled. Click the settings icon to disable them selectively.',
    duration: 5000,
  })
}

export const settings = () => {
  return (
    <div style={{ height: '50vh', overflow: 'auto' }}>
      {components.map(c => (
        <SwitchItem
          value={!!store[c.name]}
          onChange={value => {
            store[c.name] = value
            setStyle()
          }}
          note={c.description}
        >
        Remove {c.name}
        </SwitchItem>
      ))}
    </div>
  )

}

export const onUnload = () => {
  styleElm.remove()
}
