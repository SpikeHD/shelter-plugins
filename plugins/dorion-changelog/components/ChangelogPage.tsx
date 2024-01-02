import css from './ChangelogPage.tsx.scss'
import { marked } from 'marked'

const {
  ui: { injectCss, Header, HeaderTags, showToast },
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

  setReleases(loadChangelogFromLocalStorage())

  createEffect(async () => {
    setCurrentVersion(`v${await app.getVersion()}`)

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
  }, [])
  
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
      {releases().map((release: IRelease) => (
        <div class="release-card">
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
          <div innerHTML={release.changes} />
        </div>
      ))}
    </>
  )
}

