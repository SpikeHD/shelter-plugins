export async function getRepos() {
  const resp = fetch('https://api.github.com/search/repositories?q=topic:shelter-plugins')
  const json = await resp.then((res) => res.json())
  
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
  const resp = fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}/contents/plugins`)
  const json = await resp.then((res) => res.json())

  return json.map((item: any) => item.name)
}

export async function getPluginsLocation(site: string, plugins: string[]) {
  // People could be putting their plugins anywhere, but two common places are:
  // /<repo>/<plugin> OR at the root, /<plugin>
  // we can test for these simply by trying to get <site>/<path>/plugin.json and seeing if it exists
  const plugin = plugins?.[0]

  if (!plugin) {
    return null
  }

  const paths = [
    `${site}/shelter-plugins/${plugin}/plugin.json`,
    `${site}/${plugin}/plugin.json`,
  ]
  let workingPath: null | string = null

  for (const path of paths) {
    const resp = fetch(path)
    const json = await resp.then((res) => res.json())
    if (json) {
      workingPath = path
      break
    }
  }

  return workingPath
}