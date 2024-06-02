import { Plugins } from './components/Plugins.jsx'
import { createLocalStorage } from './storage.js'

const {
  settings: {
    registerSection,
  },
} = shelter

const unload = registerSection('section', 'plugin-browser', 'Plugin Browser', Plugins)

if (!window.localStorage) {
  createLocalStorage()
}

export const onUnload = () => {
  unload()
}