import { CodeInput } from '@srsholmes/solid-code-input'
import hljs from 'highlight.js/lib/core'
import cssModule from 'highlight.js/lib/languages/css'

import {css, classes} from './Editor.scss'
import { debounce } from '../util'
import { Popout } from './Popout'
import { Window } from './Window'

interface Props {
  styleElm?: HTMLStyleElement
  popout?: boolean
}

hljs.registerLanguage('css', cssModule)

const {
  ui: {
    injectCss,
    Header,
    HeaderTags,
    Button,
  },
  plugin: { store },
  solid: { createSignal, createEffect },
} = shelter

const saveCss = debounce((css: string, styleElm: HTMLStyleElement) => {
  store.inlineCss = css

  if (styleElm) {
    styleElm.textContent = css
  }
}, 500)

let injectedCss = false

export default function (props: Props) {
  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const [inlineCss, setInlineCss] = createSignal('')

  createEffect(() => {
    setInlineCss(store.inlineCss)
  })

  const setCss = (css: string) => {
    // Insert a newline if there is none
    if (css.length > 0 && css[css.length - 1] !== '\n') {
      css += '\n'
    }

    setInlineCss(css)
    saveCss(css, props.styleElm)
  }

  return (
    <>
      <Header tag={HeaderTags.H1}>CSS Editor</Header>

      {
        !props.popout && (
          <Button
            class={classes.popout}
            onClick={() => {
              console.log('popping out')
              document.body.appendChild(
                Window()
              )
            }}
          >
            Pop Out 
            <Popout />
          </Button>
        )
      }


      <div class={classes.ceditor}>
        <CodeInput
          highlightjs={hljs}
          autoHeight={true}
          resize="none"
          placeholder="Enter any CSS here..."
          onChange={setCss}
          value={inlineCss()}
          language={'css'}
        />
      </div>
    </>
  )
}
