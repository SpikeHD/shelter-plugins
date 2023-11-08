import { css, classes } from './Window.scss'
import Editor from './Editor'
import { Close } from './Close'

const {
  ui: { injectCss },
  solid: { createSignal },
} = shelter

let injectedCss = false

export const Window = () => {
  // eslint-disable-next-line prefer-const
  let ref = null

  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const [dragging, setDragging] = createSignal(false)


  const close = () => {
    if (ref) ref.remove()
  }

  const handleMouseDown = () => {
    setDragging(true)

    // Create global mousemove listener that will be unlistened when global mouse up
    // is triggered
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseUp = () => {
    setDragging(false)

    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleDrag = (evt) => {
    const clientX = evt.pageX
    const clientY = evt.pageY

    if (dragging() && ref) {
      ref.style.left = `${clientX}px`
      ref.style.top = `${clientY}px`
    }
  }

  return (
    <div class={classes.window} ref={ref}>
      <div
        class={classes.topbar}
        onmousedown={handleMouseDown}
      >
        <div class={classes.exit} onclick={close}>
          <Close />
        </div>
      </div>

      <div class={classes.inner}>
        <div class={classes.nain}>
          <Editor
            styleElm={
              document.getElementById('inline-css-output') as HTMLStyleElement
            }
            popout={true}
          />
        </div>
      </div>
    </div>
  )
}
