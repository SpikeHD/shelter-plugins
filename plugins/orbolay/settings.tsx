import { Config, defaultConfig } from './index.js'
import { classes, css } from './settings.scss'

const {
  ui: {
    injectCss,
    Text,
    TextBox,
    Divider
  },
  plugin: {
    store
  }
} = shelter

interface Props {
  ws?: WebSocket
}

let injectedCss = false

export const Settings = (props: Props) => {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const submitSettings = () => {
    // Only send the user ID via REGISTER_CONFIG; do not send any client-side-only settings (like port)
    if (props?.ws?.send && store?.userId) {
      props.ws.send(JSON.stringify({ cmd: 'REGISTER_CONFIG', userId: store.userId }))
    }
  }

  const set = (key: keyof Config, value: unknown) => {
    store[key] = value as any
    // Don't send the port to the remote; only re-send the userId if a connection exists
    submitSettings()
  }

  return (
    <>
      <div class={classes.container}>
        <Text>Orbolay Port</Text>
        <TextBox
          value={store.port ?? defaultConfig.port}
          onInput={(v) => set('port', parseInt(v) || defaultConfig.port)}
          type="number"
        />
      </div>
      <Divider />
    </>
  )
}
