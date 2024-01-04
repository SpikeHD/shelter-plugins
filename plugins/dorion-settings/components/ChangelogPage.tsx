import { css, classes } from './ChangelogPage.tsx.scss'
import { marked } from 'marked'

const {
  ui: { injectCss, Header, HeaderTags, showToast, Button, ButtonSizes, ButtonColors, Text, LinkButton },
  solid: { createSignal, createEffect },
} = shelter

const { invoke, app } = (window as any).__TAURI__
let injectedCss = false

interface IRelease {
  version: string;
  changes: string;
}

export function ChangelogPage() {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const [loading ,setLoading] = createSignal<boolean>(true)
  const [releases, setReleases] = createSignal<IRelease[]>([])
  const [currentVersion, setCurrentVersion] = createSignal<string>('')
  const [latestVersion, setLatestVersion] = createSignal<string>('')
  const [needsUpdate, setNeedsUpdate] = createSignal<boolean>(false)

  setReleases(loadChangelogFromLocalStorage())

  createEffect(async () => {
    // Load changelog from GitHub
    setReleases(await loadChangelogFromGitHub())
    
    // Set current version
    setCurrentVersion(`v${await app.getVersion()}`)

    // Set latest version
    if (releases().length > 0) {
      setLatestVersion(releases()[0].version)
    }

    // Check for updates
    const updateCheck = await invoke('update_check')
    if (updateCheck.includes('dorion')) {
      setNeedsUpdate(true)
    }

    // Fix image links
    await fixImageLinks()

    // Done loading
    setLoading(false)
  }, [])

  async function doUpdate () {
    const updateCheck = await invoke('update_check')
    invoke('do_update', {
      toUpdate: updateCheck,
    })
  }
  
  function sanitizeChangelog(releases: IRelease[]): IRelease[] {
    console.log('Sanitizing changelog')

    if (releases == null || releases.length < 1)
      throw new Error('Changelog is null. You probably ran out of GitHub API requests. Try again later.')

    const temp: IRelease[] = []
    releases.forEach((release) => {
      const version = release.version
      const changes = release.changes
        .replace(/@([\w-]+)/g, '<a href="https://github.com/$1">@$1</a>') // GitHub user
        .replace(/ #(\d+)/g, ' <a href="https://github.com/spikehd/dorion/pull/$1">#$1</a>') // GitHub issue or PR
        .replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '<a href="$1" target="_blank">$2</a>') // External link
      temp.push({ version, changes })
    })
    return temp
  }

  async function fetchChangelogFromGitHub(): Promise<IRelease[] | null> {
    const changelog: string[] | null = await invoke('get_changelog')

    if (changelog == null || changelog.length < 1)
      throw new Error('Changelog is null. You probably ran out of GitHub API requests. Try again later.')

    const temp: IRelease[] = []
    await changelog.forEach(async (entry) => {
      const lines = entry.split('\n')
      const version = lines.shift().replace('# ', '')
      let changes = await marked.parse(lines.join('\n'))
      changes = changes.replace('\n', '')

      const release = {
        version,
        changes,
      } 

      temp.push(release)
    })

    return (temp.length > 1) ? temp : null
  }

  async function loadChangelogFromGitHub(): Promise<IRelease[]> {
    let changelog: IRelease[] = []

    try {
      changelog = sanitizeChangelog(await fetchChangelogFromGitHub())

      if (changelog == null || changelog.length < 1)
        throw new Error('Changelog is null. You probably ran out of GitHub API requests. Try again later.')

      saveChangelogToLocalStorage(changelog)
    }
    catch (e) {
      console.error(e)
      showToast({
        title: 'Failed to load changelog',
        content: e.message,
        duration: 3000,
      })

      changelog = loadChangelogFromLocalStorage()
    }

    return changelog
  }

  function loadChangelogFromLocalStorage(): IRelease[] {
    const changelog = localStorage.getItem('changelog')
    if (!changelog) return []
    return JSON.parse(changelog)
  }

  function saveChangelogToLocalStorage(changelog: IRelease[]): void {
    localStorage.setItem('changelog', JSON.stringify(changelog))
  }

  async function fixImageLinks(): Promise<void> {
    const page = document.getElementById('dorion-changelog-tab')
    if (!page) return

    const images = page.getElementsByTagName('img')

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      const url = image.src
      const response = await window.fetch(url)
      image.src = await response.image()
    }
  }

  async function refresh(): Promise<void> {
    setLoading(true)
    setReleases(await loadChangelogFromGitHub())
    await fixImageLinks()
    setLoading(false)
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>Changelog</Header>
      <Button onClick={refresh} disabled={loading()} class={classes.refresh}>Refresh</Button>
      {needsUpdate() && (
        <div class={classes.card}>
          <Header tag={HeaderTags.H1} class={classes.title}>Update available!</Header>
          <Text>Your current version is {currentVersion()}</Text>
          <Button size={ButtonSizes.LARGE} color={ButtonColors.GREEN} onClick={doUpdate}>Update to {latestVersion()}</Button>
        </div>
      )}
      {releases().map((release: IRelease) => (
        <div class={classes.card}>
          <Header tag={HeaderTags.H1} class={classes.title}>
            <span>
              {release.version}
            </span>
            <div class={classes.badges}>
              {currentVersion() == release.version && 
                <span class={classes.badge}>Current</span>}
              {releases()[0].version == release.version && 
                <span class={classes.badge}>Latest</span>}
            </div>
          </Header>
          <LinkButton href={`https://github.com/SpikeHD/Dorion/releases/tag/${release.version}`}>View on GitHub</LinkButton>
          <div class={classes.contents} innerHTML={release.changes} />
        </div>
      ))}
    </>
  )
}

