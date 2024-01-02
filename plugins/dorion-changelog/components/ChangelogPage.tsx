import css from './ChangelogPage.tsx.scss'
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

  const [releases, setReleases] = createSignal<IRelease[]>([])
  const [currentVersion, setCurrentVersion] = createSignal<string>('')
  const [latestVersion, setLatestVersion] = createSignal<string>('')
  const [needsUpdate, setNeedsUpdate] = createSignal<boolean>(true)

  setReleases(loadChangelogFromLocalStorage())

  createEffect(async () => {
    // Set current version
    setCurrentVersion(`v${await app.getVersion()}`)

    // Load changelog from GitHub
    try {
      // const fetchedChangelog: IRelease[] | null = await loadChangelogFromGitHub()

      // if (!fetchedChangelog) {
      //   showToast({
      //     title: 'Failed to load changelog',
      //     content: 'Failed to load changelog from GitHub',
      //     duration: 3000,
      //   })
      //   return
      // }
      
      // const changelog = sanitizeChangelog(fetchedChangelog)

      // saveChangelogToLocalStorage(changelog)
      // setReleases(changelog)
    }
    catch (e) {
      showToast({
        title: 'Failed to load changelog',
        content: e.message,
        duration: 3000,
      })
    }

    // Set latest version
    if (releases().length > 0) {
      setLatestVersion(releases()[0].version)
    }

    // Check for updates
    const updateCheck = await invoke('update_check')
    if (updateCheck.includes('dorion')) {
      setNeedsUpdate(true)
    }
  }, [])

  async function doUpdate () {
    const updateCheck = await invoke('update_check')
    invoke('do_update', {
      toUpdate: updateCheck,
    })
  }

  function versionToNumber(version: string): number {
    const parts = version.split('.')
    return parseInt(parts[0]) * 10000 + parseInt(parts[1]) * 100 + parseInt(parts[2])
  }
  
  function sanitizeChangelog(releases: IRelease[]): IRelease[] {
    console.log('Sanitizing changelog')

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

  async function loadChangelogFromGitHub(): Promise<IRelease[] | null> {
    const changelog = await invoke('get_changelog')
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

  function loadChangelogFromLocalStorage(): IRelease[] {
    const changelog = localStorage.getItem('changelog')
    if (!changelog) return []
    return JSON.parse(changelog)
  }

  function saveChangelogToLocalStorage(changelog: IRelease[]): void {
    localStorage.setItem('changelog', JSON.stringify(changelog))
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class="tophead">Changelog</Header>
      {needsUpdate() && (
        <div class="card update-card">
          <Header tag={HeaderTags.H1} class='title'>Update available!</Header>
          <Text>Your current version is {currentVersion()}</Text>
          <Button size={ButtonSizes.LARGE} color={ButtonColors.GREEN} onClick={doUpdate}>Update to {latestVersion()}</Button>
        </div>
      )}
      {releases().map((release: IRelease) => (
        <div class="card release-card">
          <Header tag={HeaderTags.H1} class="title">
            <span>
              {release.version}
            </span>
            <div class="badges">
              {currentVersion() == release.version && 
                <span class='badge current'>Current</span>}
              {releases()[0].version == release.version && 
                <span class='badge latest'>Latest</span>}
            </div>
          </Header>
          <LinkButton href={`https://github.com/SpikeHD/Dorion/releases/tag/${release.version}`}>View on GitHub</LinkButton>
          <div class="contents" innerHTML={release.changes} />
        </div>
      ))}
    </>
  )
}

