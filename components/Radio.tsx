import { css, classes } from './Radio.tsx.scss'

const {
  ui: { injectCss, Text },
} = shelter

let injectedCss = false

export const Radio: Component<{
    onClick: (value: string) => void;
    value: string;
    label: string;
    selected: boolean;
    class?: string;
  }> = (props) => {
    if (!injectedCss) {
      injectedCss = true
      injectCss(css)
    }

    const onRadioClick = () => {
      props.onClick(props.value)
    }
  
    return (
      <div class={[classes.radio, props.class, props.selected && classes.selected].filter(Boolean).join(' ')} onClick={onRadioClick}>
        <div class={classes.radioButton}>
          {props.selected && <div class={classes.radioButtonInner}></div>}
        </div>
        <Text>{props.label}</Text>
      </div>
    )
  }