import { css, classes } from './Dropdown.tsx.scss'
import { SelectArrow } from './SelectArrow'

const {
  ui: { injectCss },
} = shelter

let injectedCss = false

export const Dropdown: Component<{
  value?: string;
  placeholder?: string;
  id?: string;
  'aria-label'?: string;
  onChange?(e): void;
  options?: {
    label: string;
    value: string;
  }[];
  selected?: string;
}> = (props) => {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  return (
    <div class={classes.dcontainer}>
      <select
        class={classes.ddown}
        value={props.value}
        placeholder={props.placeholder}
        id={props.id}
        aria-label={props['aria-label']}
        onChange={props.onChange}
      >
        {props.options?.map((o) => (
          <option value={o.value} selected={o.value === props?.selected}>
            {o.label}
          </option>
        ))}
      </select>

      <SelectArrow class={classes.dsarrow} />
    </div>
  )
}
