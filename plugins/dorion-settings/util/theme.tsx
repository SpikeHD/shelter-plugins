import { confirmModal } from './modal.jsx'



const {
  ui: {
    openModal,
    TextBox,
    Text
  },
  solid: {
    createSignal,
  }
} = shelter

export const installThemeModal = async () => {
  const [link, setLink] = createSignal<string>('')
  const [status, setStatus] = createSignal<string>('')

  openModal((props) => confirmModal({
    header: 'Install Theme',
    body: (
      <div>
        <TextBox
          value={link()}
          onInput={(v) => setLink(v)}
          placeholder={'https://raw.githubusercontent.com/.../theme.css'}
        />

        <div style={{
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          height: '24px',
        }}>
          <Text>{status()}</Text>
        </div>
      </div>
    ),
    confirmText: 'Install',
    type: 'neutral',
    onConfirm: () => {
      installAndLoad(link(), setStatus).catch(e => {
        setStatus(e)
      }).then(props.close)
    },
    onCancel: props.close,
  }))
}

export const loadTheme = async (theme: string) => {
  const { invoke } = (window as any).__TAURI__

  // Get the Dorion theme style tag, replace the contents
  const themeTag = document.getElementById('dorion-theme') as HTMLStyleElement

  if (theme === 'none') return themeTag.innerText = ''

  const themeContents = await invoke('get_theme', {
    name: theme
  })

  // Localize
  const localized = await invoke('localize_imports', {
    css: themeContents,
    name: theme
  })

  console.log('Got the localized theme!')

  // Internal Dorion function
  const contents = window.Dorion.util.cssSanitize(localized)

  console.log('Sanitized!')

  themeTag.innerHTML = contents
}

export const installAndLoad = async (link: string, statusUpdater: (string) => void) => {
  const { invoke } = (window as any).__TAURI__

  statusUpdater('Fetching...')

  const themeName = await invoke('theme_from_link', {
    link
  })

  statusUpdater(`Applying ${themeName} ...`)

  // Get the Dorion theme style tag, replace the contents
  await loadTheme(themeName)

  // Save the theme to the config
  const config = JSON.parse(await invoke('read_config_file'))
  config.theme = themeName

  statusUpdater('Saving...')

  await invoke('write_config_file', {
    contents: JSON.stringify(config)
  })

  statusUpdater('Done!')
}