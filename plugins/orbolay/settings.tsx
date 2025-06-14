import { Dropdown } from '../../components/Dropdown.jsx'
import { Config, CornerAlignment, defaultConfig } from './index.js'
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

type Alignment = 'topleft' | 'topright' | 'bottomleft' | 'bottomright'

const alignmentToCornerAlignment = (alignment: Alignment) => {
  const top = alignment.indexOf('top') !== -1
  const left = alignment.indexOf('left') !== -1

  return {
    top,
    left
  }
}

const cornerAlignmentToAlignment = (alignment: CornerAlignment) => {
  return (alignment.top ? 'top' : 'bottom') + (alignment.left ? 'left' : 'right')
}

let injectedCss = false

export const Settings = (ws) => {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  const submitSettings = () => {
    ws?.send?.(JSON.stringify({
      cmd: 'REGISTER_CONFIG',
      ...store.config
    }))
  }

  const set = (key: keyof Config, value: unknown) => {
    store.config[key] = value
    submitSettings()
  }

  return (
    <>
      <div class={classes.container}>
        <Text>Orbolay Port</Text>
        <TextBox
          value={store.config.port ?? defaultConfig.port}
          onInput={(v) => set('port', v)}
          type="number"
        />
      </div>
      <Divider />

      <div class={classes.container}>
        <Text>Messages Alignment</Text>
        <Dropdown
          value={cornerAlignmentToAlignment(store.config.messageAlignment)}
          selected={cornerAlignmentToAlignment(store.config.messageAlignment)}
          onChange={(e) => set('messageAlignment', alignmentToCornerAlignment(e.target.value))}
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
          value={cornerAlignmentToAlignment(store.config.userAlignment)}
          selected={cornerAlignmentToAlignment(store.config.userAlignment)}
          onChange={(e) => set('userAlignment', alignmentToCornerAlignment(e.target.value))}
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