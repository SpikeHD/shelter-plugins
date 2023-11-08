import Editor from './components/Editor'

const {
  settings: {
    registerSection,
  },
  plugin: {
    store
  }
} = shelter

let styleElm: HTMLStyleElement | null = null

// Silly little styling tweak for the code editor
const style = document.createElement('style')
style.textContent = '.code-highlighted { color: var(--text-normal) }'
styleElm = document.body.appendChild(style)

// Also create another style element to contain the CSS
let inlineStyleElm: HTMLStyleElement | null = null
const inlineStyle = document.createElement('style')
inlineStyle.id = 'inline-css-output'
inlineStyleElm = document.body.appendChild(inlineStyle)

// Set the initial contents of the inline CSS
inlineStyleElm.textContent = store.inlineCss

const unload = registerSection('section', 'inline-css', 'CSS Editor', () => Editor({ styleElm: inlineStyleElm }))

export const onUnload = () => {
  unload()

  if (styleElm) {
    styleElm.remove()
  }

  if (inlineStyleElm) {
    inlineStyleElm.remove()
  }
}