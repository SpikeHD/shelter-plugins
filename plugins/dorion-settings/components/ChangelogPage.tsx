import type { IRelease, TReleases } from '../types/release.ts'
import { css, classes } from './ChangelogPage.tsx.scss'
import { processReleaseBodies, loadChangelog, fixImageLinks } from '../util/changelog.js'

const PAGE_ID = 'dorion-changelog-tab'

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

const { invoke, app } = (window as any).__TAURI__
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
      setLatestVersion(releases()[0].version)
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
      <Header tag={HeaderTags.H1} class={classes.tophead}>Changelog</Header>
      <Button onClick={refresh} disabled={loading()} class={classes.refresh}>Refresh</Button>
      {loading() ? (
        <div class={classes.card}>
          <div class={classes.spinner} />
        </div>
      ) : (
        <>  
          {updateCheck().includes('dorion') && (
            <div class={classes.card}>
              <Header tag={HeaderTags.H1} class={classes.title}>Update available!</Header>
              <Text>Your current version is {currentVersion()}</Text>
              <Button size={ButtonSizes.LARGE} color={ButtonColors.GREEN} onClick={doUpdate}>Update to {latestVersion()}</Button>
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
                    <span class={classes.badge}>Current</span>}
                  {releases()[0].tag_name == release.tag_name && 
                    <span class={classes.badge}>Latest</span>}
                </div>
              </Header>
              <LinkButton href={release.html_url}>View on GitHub</LinkButton>
              <div class={classes.contents} innerHTML={release.body} />
            </div>
          ))}
        </>
      )}
    </>
  )
}

