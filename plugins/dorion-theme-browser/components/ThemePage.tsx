import { Dropdown } from '../../../components/Dropdown.jsx'
import { debounce } from '../../../util/debounce.js'
import { themeListEndpoint } from '../api.js'
import { ThemeCard } from './ThemeCard.jsx'
import { css, classes } from './ThemePage.tsx.scss'
import { t } from '../../../util/i18n.js'

const {
  ui: {
    injectCss,
    Divider,
    Header,
    HeaderTags,
    TextBox
  },
  solid: {
    createSignal,
    createEffect,
  },
} = shelter

let injectedCss = false

export function ThemePage() {
  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const [themeData, setThemeData] = createSignal<any[]>([])
  const [page, setPage] = createSignal(1)
  const [sort, setSort] = createSignal('popular')
  const [search, setSearch] = createSignal('')

  createEffect(async () => {
    await loadThemes()
  })

  const loadThemes = async () => {
    setThemeData(await themeListEndpoint({ page: page().toString(), sort: sort(), filter: search() }))
  }

  const doSearch = debounce((v: string) => setSearch(v), 500)

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.tophead}>{t('dorion_themes.title')}</Header>

      <div class={classes.sortSection}>
        <Dropdown
          value={sort()}
          onChange={(e) => {
            setSort(e.target.value)
            loadThemes()
          }}
          style='width: 30%;'
          options={[
            { label: t('dorion_themes.popular'), value: 'popular' },
            { label: t('dorion_themes.creation_date'), value: 'creationdate' },
            { label: t('dorion_themes.name'), value: 'name' },
            { label: t('dorion_themes.likes'), value: 'likes' },
            { label: t('dorion_themes.downloads'), value: 'downloads' },
            { label: t('dorion_themes.recently_updated'), value: 'recentlyupdated' },
          ]}
          placeholder={t('dorion_themes.sort_by')}
        />

        <span class={classes.searchBox}>
          <TextBox
            value={search()}
            onInput={(v) => doSearch(v)}
            placeholder={t('dorion_themes.search_placeholder')}
          />
        </span>
      </div>

      <Divider mt={16} mb={16} />

      <div class={classes.themeCards}>
        {
          themeData().map((t) => (
            <ThemeCard
              key={t.name}
              thumbnail={t.thumbnail}
              likes={t.likes}
              downloads={t.downloads}
              theme={t.name}
              description={t.description}
              author={t.author}
              install_url={t.install_url}
            />
          ))
        }
      </div>

      <div class={classes.pagesOuter}>
        <div class={classes.pages}>
          <div
            class={classes.pageBtn}
            onClick={() => {
              setPage(page() - 1)
              loadThemes()
            }}
          >&lt; {t('common.previous')}</div>

          <input type='number' value={page()} onInput={(e) => setPage(parseInt(e.target.value))} />

          <div
            class={classes.pageBtn}
            onClick={() => {
              setPage(page() + 1)
              loadThemes()
            }}
          >{t('common.next')} &gt;</div>
        </div>
      </div>
    </>
  )
}