import { css, classes } from './Card.tsx.scss'

const {
  ui: { injectCss },
} = shelter

let injectedCss = false

export const Card: Component<{
  title: string;
  children?: any;
  style?: any;
  class?: string;
}> = (props) => {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  return (
    <div class={classes.card + ` ${props.class}`} style={props.style}>
      { props.children }
    </div>
  )
}