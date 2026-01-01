import { invoke,app, appName } from '../../../api/api.js'
import { t } from '../../../util/i18n.js'
import type { IRelease, TReleases } from '../types/release.js'
import { css, classes } from './ChangelogPage.tsx.scss'
import { processReleaseBodies, loadChangelog, fixImageLinks } from '../util/changelog.js'

const PAGE_ID = `${appName.toLowerCase()}-changelog-tab`

const {
  ui: { 
    injectCss, 
    Header, 
    HeaderTags, 
    Button, 
    ButtonSizes, 
    ButtonColors, 
    Text, 
    LinkButton 
  },
  solid: { createSignal, createEffect },
} = shelter

let injectedCss = false

export function ChangelogPage() {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const [loading, setLoading] = createSignal<boolean>(true)
  const [releases, setReleases] = createSignal<TReleases>([])
  const [currentVersion, setCurrentVersion] = createSignal<string>('')
  const [latestVersion, setLatestVersion] = createSignal<string>('')
  const [updateCheck, setUpdateCheck] = createSignal<string[]>([])

  createEffect(async () => {
    // Load changelog from GitHub
    setReleases(await processReleaseBodies(await loadChangelog()))
    
    // Set current version
    setCurrentVersion(`v${await app.getVersion()}`)

    // Set latest version
    if (releases().length > 0) {
      setLatestVersion(releases()[0].tag_name)
    }

    // Check for updates
    setUpdateCheck(await invoke('update_check'))

    // Done loading except for images
    // Show page as soon as possible to prevent loading page for a long time
    setLoading(false)
    
    // Fix image links
    await fixImageLinks(document.getElementById(PAGE_ID))
  }, [])

  async function doUpdate() {
    invoke('do_update', {
      toUpdate: updateCheck()
    })
  }

  async function refresh(): Promise<void> {
    setLoading(true)
    setReleases(await processReleaseBodies(await loadChangelog()))
    setLoading(false)
    await fixImageLinks(document.getElementById(PAGE_ID))
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>{t('dorion_changelog.title')}</Header>
      <Button onClick={refresh} disabled={loading()} class={classes.refresh}>{t('dorion_changelog.refresh')}</Button>
      {loading() ? (
        <div class={classes.card}>
          <div class={classes.spinner} />
        </div>
      ) : (
        <>  
          {updateCheck().includes('dorion') && (
            <div class={classes.card}>
              <Header tag={HeaderTags.H1} class={classes.title}>{t('dorion_changelog.update_available')}</Header>
              <Text>{t('dorion_changelog.current_version').replace('{{version}}', currentVersion())}</Text>
              <Button size={ButtonSizes.LARGE} color={ButtonColors.GREEN} onClick={doUpdate}>{t('dorion_changelog.update_to').replace('{{version}}', latestVersion())}</Button>
            </div>
          )}
          {releases() != null && releases().length > 0 && releases().map((release: IRelease) => (
            <div class={classes.card}>
              <Header tag={HeaderTags.H1} class={classes.title}>
                <span>
                  {release.name}
                </span>
                <div class={classes.badges}>
                  {currentVersion() == release.tag_name && 
                    <span class={classes.badge}>{t('dorion_changelog.current')}</span>}
                  {releases()[0].tag_name == release.tag_name && 
                    <span class={classes.badge}>{t('dorion_changelog.latest')}</span>}
                </div>
              </Header>
              <LinkButton href={release.html_url}>{t('dorion_changelog.view_on_github')}</LinkButton>
              <div class={classes.contents} innerHTML={release.body} />
            </div>
          ))}
        </>
      )}
    </>
  )
}

