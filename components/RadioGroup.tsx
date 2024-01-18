import { Radio } from './Radio.jsx'
import { css, classes } from './Radio.tsx.scss'

const {
  ui: { injectCss },
} = shelter

let injectedCss = false

export const RadioGroup: Component<{
    onChange: (value: string) => void;
    selected: string;
    options: string[];
  }> = (props) => {
    if (!injectedCss) {
      injectedCss = true
      injectCss(css)
    }
  
    return (
      <div>
        {props.options.map((o) => (
          <Radio class={classes.radioGroupItem} label={o.label} value={o.value} onClick={props.onChange} selected={props.selected === o.value} />
        ))}
      </div>
    )
  }