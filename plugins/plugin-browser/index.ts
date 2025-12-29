import { Plugins } from './components/Plugins.jsx'

const {
  settings: {
    registerSection,
  },
} = shelter

const unload = registerSection('section', 'plugin-browser', 'Plugin Browser', Plugins)

export const onUnload = () => {
  unload()
}
