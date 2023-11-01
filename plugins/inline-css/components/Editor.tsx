import { CodeInput } from '@srsholmes/solid-code-input'
import hljs from 'highlight.js/lib/core'
import cssModule from 'highlight.js/lib/languages/css'

import {css, classes} from './Editor.scss'

hljs.registerLanguage('css', cssModule)

const {
  ui: {
    injectCss,
    Header,
    HeaderTags
  },
  plugin: { store },
  solid: { createSignal },
} = shelter

let injectedCss = false

export default function () {
  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const [inlineCss, setInlineCss] = createSignal('')

  return (
    <>
      <Header tag={HeaderTags.H1}>CSS Editor</Header>

      <div class={classes.ceditor}>
        <CodeInput
          highlightjs={hljs}
          autoHeight={false}
          resize="none"
          placeholder="Enter any CSS here..."
          onChange={setInlineCss}
          value={inlineCss()}
          language={'css'}
        />
      </div>
    </>
  )
}
