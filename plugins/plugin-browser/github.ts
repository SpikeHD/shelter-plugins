import { getPluginJsonCache, savePluginJsonCache, savePluginsCache } from './storage.js'

const ghFetch = async (url: string) => {
  return fetch(url, {
    headers: {
      'User-Agent': 'Shelter Plugin Browser',
    }
  })
}

export async function getRepos() {
  const resp = await ghFetch('https://api.github.com/search/repositories?q=shelter-plugins')
  const json = await resp.json()
  
  // Transform into more digestable/saveable data
  return json.items.map((item: any) => {
    return {
      name: item.name,
      description: item.description,
      url: item.html_url,
      stars: item.stargazers_count,
      owner: item.owner.login,
      owner_url: item.owner.html_url,
      owner_avatar: item.owner.avatar_url,
      homepage: item.homepage,
    }
  }) satisfies Repo[]
}

export async function pluginsSite(repo: Repo) {
  // If there is a linked website in the repo, use that, otherwise assume <username>.github.io/<repo>
  if (repo.homepage) {
    return repo.homepage
  } else {
    return `https://${repo.owner}.github.io/${repo.name}`
  }
}

export async function getRepoPlugins(repo: Repo) {
  // List all the files in the plugins/ directory in the repo
  const resp = await ghFetch(`https://api.github.com/repos/${repo.owner}/${repo.name}/contents/plugins`)
  const json = await resp.json()

  // Ensure this is an array
  if (!Array.isArray(json)) {
    return []
  }

  return json.map((item: any) => item.name)
}

export async function getPluginsLocation(site: string, plugins: string[]) {
  // People could be putting their plugins anywhere, but two common places are:
  // /<repo>/<plugin> OR at the root, /<plugin>
  // we can test for these simply by trying to get <site>/<path>/plugin.json and seeing if it exists
  const plugin = plugins?.[0]

  if (!plugin) {
    return site
  }

  const paths = [
    `${site}/shelter-plugins/`,
    `${site}/`,
  ]
  let workingPath: null | string = site

  for (const path of paths) {
    const url = `${path}/${plugin}/plugin.json`
    const resp = await ghFetch(url)

    try {
      const json = await resp.json()
      if (json.name) {
        workingPath = path
        break
      }
    } catch (e) {
      // If we get an error, its probably because the file doesn't exist
      // So we can just ignore it
    }
  }

  return workingPath
}

export async function getPluginJson(site: string, plugin: string) {
  const url = `${site}/${plugin}/plugin.json`

  // Check if we have it cached
  const cache = getPluginJsonCache()
  if (cache[url]) {
    return cache[url]
  }

  const resp = await ghFetch(url)
  
  try {
    const json = await resp.json()

    // Cache the plugin.json
    savePluginJsonCache(url, json)

    return json
  } catch (e) {
    console.log('[Plugin Browser] Error parsing plugin.json: ', e.message)
    return null
  }
}

export async function getAllPlugins() {
  const repos = await getRepos()

  // Map the plugins to their repos
  let plugins = await Promise.all(repos.map(async (repo) => {
    try {
      const site = await pluginsSite(repo)

      if (!site) {
        console.log('[Plugin Browser] No site found for repo: ', repo.name)
        return null
      }
  
      const plugins = await getRepoPlugins(repo)
  
      if (!plugins || plugins.length === 0) {
        console.log(`[Plugin Browser] No plugins found for repo: ${repo.owner}/${repo.name}`)
        return null
      }
  
      return {
        site: await getPluginsLocation(site, plugins),
        repo,
        plugins,
      } satisfies RepoInfo
    } catch(e) {
      console.error(e)
      return null;
    }
  }))

  plugins = plugins.filter((plugin) => plugin !== null)

  // Save to cache
  savePluginsCache(plugins)

  return plugins as RepoInfo[]
}