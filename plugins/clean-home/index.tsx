const {
  plugin: {
    store
  },
  ui: {
    SwitchItem
  }
} = shelter

const components = [
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
    name: 'Apps button',
    description: 'Removes the Apps button from the text area',
    rules: `
      div[class*="channelAppLauncher"] { display: none; }
    `
  },
  {
    name: 'Quest popout',
    description: 'Removes the Nitro quest popup',
    rules: `
      div[class*="questPromoContent"] { display: none; }
    `
  },
  {
    name: 'Server boost bar',
    description: 'Removes the server boost barn',
    rules: `
      div[data-list-item-id^="channels___boosts-"] { display: none; }
    `
  },
  {
    name: 'Gift button',
    description: 'Removes the gift button in the chat bar',
    rules: `
      div[class*="sansAttachButton"] > div[class^="buttons__"] > button {
        display: none;
      }
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
    duration: 3000,
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