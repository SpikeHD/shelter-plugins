import Editor from './components/Editor'

const {
  settings: {
    registerSection,
  }
} = shelter

const unload = registerSection('section', 'inline-css', 'CSS Editor', Editor)

export const onUnload = () => {
  unload()
}