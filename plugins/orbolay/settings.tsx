import { Dropdown } from '../../components/Dropdown.jsx'
import { Config, defaultConfig } from './index.js'
import { classes, css } from './settings.scss'

const {
  ui: {
    injectCss,
    SwitchItem,
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
    props?.ws?.send?.(JSON.stringify({
      cmd: 'REGISTER_CONFIG',
      ...store.config
    }))
  }

  const set = (key: keyof Config, value: unknown) => {
    store.config = {
      ...store.config,
      [key]: value
    }
    submitSettings()
  }

  return (
    <>
      <div class={classes.container}>
        <Text>Orbolay Port</Text>
        <TextBox
          value={store.config.port ?? defaultConfig.port}
          onInput={(v) => set('port', parseInt(v) || defaultConfig.port)}
          type="number"
        />
      </div>
      <Divider />

      <div class={classes.container}>
        <Text>Messages Alignment</Text>
        <Dropdown
          value={store.config.messagesAlignment}
          selected={store.config.messagesAlignment}
          onChange={(e) => set('messageAlignment', e.target.value)}
          options={[
            { label: 'Top Left', value: 'topleft' },
            { label: 'Top Right', value: 'topright' },
            { label: 'Bottom Left', value: 'bottomleft' },
            { label: 'Bottom Right', value: 'bottomright' },
          ]}
        />
      </div>
      <Divider />

      <div class={classes.container}>
        <Text>User Alignment</Text>
        <Dropdown
          value={store.config.userAlignment}
          selected={store.config.userAlignment}
          onChange={(e) => set('userAlignment', e.target.value)}
          options={[
            { label: 'Top Left', value: 'topleft' },
            { label: 'Top Right', value: 'topright' },
            { label: 'Bottom Left', value: 'bottomleft' },
            { label: 'Bottom Right', value: 'bottomright' },
          ]}
        />
      </div>
      <Divider mb={12} />

      <SwitchItem
        value={store.config.voiceSemitransparent}
        onChange={(v) => set('voiceSemitransparent', v)}
      >
        VC Members Semi-Transparent
      </SwitchItem>

      <SwitchItem
        value={store.config.messagesSemitransparent}
        onChange={(v) => set('messagesSemitransparent', v)}
      >
        Message Notifications Semi-Transparent
      </SwitchItem>
    </>
  )
}