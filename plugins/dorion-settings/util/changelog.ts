import { marked } from 'marked'
import { TReleases } from '../types/release.js'

const {
  ui: { showToast },
  plugins: { installedPlugins }
} = shelter

const devModeReservedId = '__DEVMODE_PLUGIN_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'

function isDevMode(): boolean {
  return installedPlugins() && devModeReservedId in installedPlugins()
}

export async function loadChangelog(): Promise<TReleases> {
  ///NOTE - This is a thing for development. Otherwise GitHub will rate limit us :)
  if (isDevMode()) {
    console.warn('[Dorion Changelog] Dev mode is on. Loading changelog from local storage.')
    return loadChangelogFromLocalStorage()
  }

  try {
    const changelog = await fetchChangelogFromGitHub()
    saveChangelogToLocalStorage(changelog)
    return changelog
  }
  catch (e) {
    console.error(e)
    showToast({
      title: 'Failed to load changelog',
      content: e.message,
      duration: 3000,
    })

    return loadChangelogFromLocalStorage()
  }
}

async function fetchChangelogFromGitHub(): Promise<TReleases> {
  const response = await fetch('https://api.github.com/repos/SpikeHD/Dorion/releases', {
    headers: {
      'User-Agent': 'Dorion'
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch changelog. ${response.status} ${response.statusText}`)
  }

  return await response.json() as TReleases
}

function loadChangelogFromLocalStorage(): TReleases {
  const changelog = localStorage.getItem('changelog')
  if (!changelog) return []
  return JSON.parse(changelog)
}

function saveChangelogToLocalStorage(changelog: TReleases): void {
  localStorage.setItem('changelog', JSON.stringify(changelog))
}

export async function processReleaseBodies(releases: TReleases): Promise<TReleases> {
  const processedReleases = await Promise.all(releases.map(async (release) => {
    release.body = await processReleaseBody(release.body)
    return release
  }))

  return processedReleases
}

export async function processReleaseBody(body: string): Promise<string> {
  const parsedBody = await marked.parse(body)

  return parsedBody
    .replace('\n', '') // remove newlines. It's converted to html, so it's not needed
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code)) // Fix ascii references (such as &#39;)
    .replace(/@([\w-]+)/g, '<a href="https://github.com/$1">@$1</a>') // GitHub user
    .replace(/#(\d+)/g, '<a href="https://github.com/spikehd/dorion/pull/$1">#$1</a>') // GitHub issue or PR
    .replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '<a href="$1" target="_blank">$2</a>') // External link
}

export async function fixImageLinks(scope: HTMLElement): Promise<void> {
  if (!scope) return

  const images = scope.getElementsByTagName('img')

  await Promise.all(Array.from(images).map(async (image: HTMLImageElement) => {
    const url = image.src
    image.src = await window.Dorion.util.fetchImage(url)
  }))    
}
