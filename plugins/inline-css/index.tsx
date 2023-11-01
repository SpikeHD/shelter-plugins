import Editor from './components/Editor'

const {
  settings: {
    registerSection,
  }
} = shelter

let styleElm: HTMLStyleElement | null = null

const style = document.createElement('style')
style.textContent = '.code-highlighted { color: var(--text-normal) }'
styleElm = document.body.appendChild(style)

const unload = registerSection('section', 'inline-css', 'CSS Editor', Editor)

export const onUnload = () => {
  unload()

  if (styleElm) {
    styleElm.remove()
  }
}