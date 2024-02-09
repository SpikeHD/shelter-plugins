import { invoke } from '../../../api/api.js'
import { ClientModList } from '../components/ClientModList.jsx'
import { PluginList } from '../components/PluginList.jsx'
import { css, classes } from './PluginsPage.tsx.scss'
import { WarningCard } from '../components/WarningCard.jsx'

const {
  ui: { Header, Button, HeaderTags, injectCss, ButtonSizes},
  solid: { createSignal },
} = shelter

let injectedCss = false

export function PluginsPage() {
  const [restartRequired , setRestartRequired] = createSignal(false)

  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const openPluginsFolder = () => {
    invoke('open_plugins')
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>Client Mods & Plugins</Header>

      {restartRequired() && (
        <WarningCard />
      )}

      <Header class={classes.shead}>Client Mods</Header>

      <ClientModList
        onChange={() => {
          setRestartRequired(true)
        }}
      />
      
      <Header class={classes.shead}>Plugins</Header>

      <PluginList
        onChange={() => {
          setRestartRequired(true)
        }}
      />

      <Button size={ButtonSizes.MEDIUM} class={classes.openButton} onClick={openPluginsFolder}>Open Plugins Folder</Button>
    </>
  )
}
