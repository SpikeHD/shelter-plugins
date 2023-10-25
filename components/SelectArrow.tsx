interface Props {
  class?: string;
}

export const SelectArrow = (props: Props) => (
  <svg class={props.class} aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z" />
  </svg>
)