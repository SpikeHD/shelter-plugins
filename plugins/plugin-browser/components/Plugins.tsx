import fuzzysort from 'fuzzysort'
import { css, classes } from './Plugins.scss'
import { getAllPlugins, PluginData, PluginRepo } from '../api.js'
import { PluginCard } from './PluginCard.jsx'

const {
  ui: {
    Button,
    injectCss,
    Header,
    HeaderTags,
    Text,
    Divider,
    TextBox,
    showToast
  },
  solid: {
    createSignal,
    createEffect,
  }
} = shelter

let injectedCss = false
const debounce = (fn: (...args) => any, ms: number) => {
  let timeoutId = null
  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      fn(...args)
    }, ms)
  }
}

export function Plugins() {
  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const [repos, setRepos] = createSignal<PluginRepo[]>([])
  const [search, setSearch] = createSignal('')
  const [filteredRepos, setFilteredRepos] = createSignal<PluginRepo[]>([])

  const loadPlugins = async () => {
    const plugins = await getAllPlugins().catch((e) => {
      console.error(e)

      showToast({
        title: 'Plugin Browser',
        content: 'Failed to load plugins, check DevTools for error.',
        duration: 5000,
      })

      return [] as PluginRepo[]
    })

    setRepos(plugins)
    setFilteredRepos(plugins)
  }

  createEffect(() => {
    loadPlugins()
  })

  createEffect(() => {
    const searchTerm = search()
    const allRepos = repos()

    if (!searchTerm) {
      setFilteredRepos(allRepos.map((repo: PluginRepo) => {
        const allPlugins = repo.plugins.filter(p => !(p.name.toLowerCase().includes('dorion') && repo.name === 'SpikeHD/shelter-plugins'))
        return { ...repo, plugins: allPlugins }
      }))
      return
    }

    const filteredReposList = allRepos.map((repo: PluginRepo) => {
      const allPlugins = repo.plugins.filter(p => !(p.name.toLowerCase().includes('dorion') && repo.name === 'SpikeHD/shelter-plugins'))

      if (allPlugins.length === 0) {
        return { ...repo, plugins: [] }
      }

      const results = fuzzysort.go(searchTerm, allPlugins, {
        keys: ['name', 'description'],
        threshold: 0
      })

      const filteredPlugins = results.map(result => result.obj)

      return { ...repo, plugins: filteredPlugins }
    }).filter(repo => repo.plugins.length > 0)

    setFilteredRepos(filteredReposList)
  })

  return (
    <>
      <Header tag={HeaderTags.H1}>Plugins</Header>

      <Divider mt={16} mb={16} />

      <div class={classes.split}>
        <TextBox
          value={search()}
          onInput={debounce((v) => setSearch(v), 100)}
          placeholder={'Search...'}
        />

        <Button
          onClick={() => {
            setRepos([])
            loadPlugins()
          }}
        >
          Refresh
        </Button>
      </div>


      {
        repos()?.length > 0 ? filteredRepos().map((repo: PluginRepo) => {
          return (
            <>
              <Divider mt={16} mb={16} />
              <div class={classes.repoHeader}>
                <Header tag={HeaderTags.H2}>{repo.name}</Header>
                <Header tag={HeaderTags.H2}>
                  <a href={repo.url} target="_blank">View Repository</a>
                </Header>
              </div>

              <div class={classes.pluginList}>
                {
                  repo.plugins.map((p: PluginData) => {
                    return (
                      <PluginCard
                        plugin={p}
                      />
                    )
                  })
                }
              </div>
            </>
          )
        }) : (
          <div class={classes.loading}>
            <Text>Loading...</Text>
          </div>
        )
      }
    </>
  )
}
