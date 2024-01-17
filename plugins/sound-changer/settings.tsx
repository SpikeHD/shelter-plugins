import { Dropdown } from '../../components/Dropdown'
import { css, classes } from './settings.scss'

const {
  plugin: { store },
  ui: { SwitchItem, Header, injectCss },
} = shelter

let injectedCss = false

export default () => {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  return (
    <>
      <Header class={classes.shead}>Sound Settings</Header>
    </>
  )
}
