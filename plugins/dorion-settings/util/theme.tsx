import { installAndLoad } from '../../../util/theme.js'
import { confirmModal } from '../../../util/modal.jsx'

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

export const installThemeModal = async (addToList: (string) => void) => {
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
    onConfirm: async () => {
      const themeName = await installAndLoad(link(), setStatus).catch(e => {
        setStatus(e)
      })

      addToList(themeName)

      props.close()
    },
    onCancel: props.close,
  }))
}
