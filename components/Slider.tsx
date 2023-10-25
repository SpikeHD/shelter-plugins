import { css, classes } from "./Card.tsx.scss"

const {
  ui: { injectCss },
} = shelter;

let injectedCss = false;

export const Slider: Component<{
  min: number;
  max: number;
  // These are the little labelled ticks on the slider
  ticks?: string[];
  class?: string;
  style?: any;
}> = (props) => {
  if (!injectedCss) {
    injectedCss = true;
    injectCss(css);
  }

  return (
    <div class={classes.card} style={props.style}>
      { props.children }
    </div>
  );
}