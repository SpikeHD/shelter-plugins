import { invoke } from '../../../api/api.js'
import { t } from '../../../util/i18n.js'
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

  const openExtensionsFolder = () => {
    invoke('open_extensions')
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>{t('dorion_plugins.title')}</Header>

      {restartRequired() && (
        <WarningCard />
      )}

      <Header class={classes.shead}>{t('dorion_plugins.client_mods')}</Header>

      <ClientModList
        onChange={() => {
          setRestartRequired(true)
        }}
      />
      
      <Header class={classes.shead}>{t('dorion_plugins.plugins')}</Header>

      <PluginList
        onChange={() => {
          setRestartRequired(true)
        }}
      />

      <div class={classes.pbuttons}>
        <Button
          size={ButtonSizes.MEDIUM}
          class={classes.openButton}
          style={{ width: '100%', padding: '18px' }}
          grow={true}
          onClick={openPluginsFolder}
        >
          {t('dorion_plugins.open_plugins_folder')}
        </Button>

        <Button
          size={ButtonSizes.MEDIUM}
          class={classes.openButton}
          style={{ width: '100%', padding: '18px' }}
          grow={true}
          onClick={openExtensionsFolder}
        >
          {t('dorion_plugins.open_extensions_folder')}
        </Button>
      </div>
    </>
  )
}
