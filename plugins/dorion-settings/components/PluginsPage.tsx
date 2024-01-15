import { ClientModList } from './ClientModList.jsx'
import { PluginList } from './PluginList.jsx'
import { css, classes } from './PluginsPage.tsx.scss'
import { Card } from '../../../components/Card.jsx'
import { WarningCard } from './WarningCard.jsx'

const { invoke } = (window as any).__TAURI__

const {
  ui: { Header, Button, HeaderTags, injectCss, Text },
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
      <Header tag={HeaderTags.H1} class={classes.tophead}>Plugins & Client Mods</Header>

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

      <Card class={classes.card}>
        <div class={classes.fcard}>
          <Text class={classes.left16}>Plugins Folder</Text>
          <Button onClick={openPluginsFolder}>Open</Button>
        </div>
      </Card>

      <PluginList
        onChange={() => {
          setRestartRequired(true)
        }}
      />
    </>
  )
}
