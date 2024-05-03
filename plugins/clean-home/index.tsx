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
  }
]

const style = document.createElement('style')
const styleElm = document.body.appendChild(style)

const setStyle = () => {
  styleElm.textContent = components
    .filter(c => store[c.name])
    .map(c => c.rules)
    .join(' ')
}

export const settings = () => {
  return components.map(c => {
    return (
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
    )
  })
}

export const onUnload = () => {
  styleElm.remove()
}