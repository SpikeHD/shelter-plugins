import { css, classes } from "./Slider.tsx.scss"

const {
  ui: { injectCss },
  solid: { createSignal },
} = shelter;

let injectedCss = false;

export const Slider: Component<{
  min: number;
  max: number;
  // These are the little labelled ticks on the slider
  steps?: string[];
  class?: string;
  style?: any;
  onChange?(e): void;
  value?: number;
}> = (props) => {
  const [fill, setFill] = createSignal(props.value || 0);

  if (!injectedCss) {
    injectedCss = true;
    injectCss(css);
  }

  return (
    <div class={classes.scontainer}>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        class={classes.srange}
        value={props.value || props.min}
        style={{
          ...props.style,
          '--upper-half': `${fill()}%`,
        }}
        onChange={(e) => {
          props.onChange?.(e);
        }}
        onInput={(e) => {
          // Calc the fill based on the min and max
          const newFill = ((e.target.value - props.min) / (props.max - props.min)) * 100;
          setFill(newFill);
        }}
      />
      <div class={classes.sticks}>
        {props.steps?.map((t) => (
          <div class={classes.stick}>
            <span>{t}</span>
            <div class={classes.stickline}></div>
          </div>
        ))}
      </div>
    </div>
  );
}