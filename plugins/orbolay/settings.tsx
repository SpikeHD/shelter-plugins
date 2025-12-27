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
      ...store
    }))
  }

  const set = (key: keyof Config, value: unknown) => {
    store[key] = value
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

      <SwitchItem
        value={store.isKeybindEnabled}
        onChange={(v) => set('keybindIsEnabled', v)}
      >
        Enable Global Keybind
      </SwitchItem>

      <div class={classes.container}>
        <Text>Messages Alignment</Text>
        <Dropdown
          value={store.messagesAlignment}
          selected={store.messagesAlignment}
          onChange={(e) => set('messageAlignment', e.target.value)}
          options={[
            { label: 'Top Left', value: 'topleft' },
            { label: 'Top Right', value: 'topright' },
            { label: 'Bottom Left', value: 'bottomleft' },
            { label: 'Bottom Right', value: 'bottomright' },
            { label: 'Top Center', value: 'topcenter' },
            { label: 'Bottom Center', value: 'bottomcenter' },
            { label: 'Center Left', value: 'centerleft' },
            { label: 'Center Right', value: 'centerright' },
          ]}
        />
      </div>
      <Divider />

      <div class={classes.container}>
        <Text>User Alignment</Text>
        <Dropdown
          value={store.userAlignment}
          selected={store.userAlignment}
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
        value={store.voiceSemitransparent}
        onChange={(v) => set('voiceSemitransparent', v)}
      >
        VC Members Semi-Transparent
      </SwitchItem>

      <SwitchItem
        value={store.messagesSemitransparent}
        onChange={(v) => set('messagesSemitransparent', v)}
      >
        Message Notifications Semi-Transparent
      </SwitchItem>
    </>
  )
}
