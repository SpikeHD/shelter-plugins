import { css, classes } from './Window.scss'
import Editor from './Editor'
import { Close } from './Close'
import { debounce } from '../util'

const {
  ui: { injectCss },
} = shelter

let injectedCss = false

export const Window = () => {
  // eslint-disable-next-line prefer-const
  let ref = null

  if (!injectedCss) {
    injectCss(css)
    injectedCss = true
  }

  const close = () => {
    if (ref) ref.remove()
  }

  const handleMouseDown = (evt) => {
    evt.preventDefault()
    mousedown(evt)
  }

  // Yoinked from SpikeHD/SpikeHD.github.io
  const mousedown = (evt) => {
    // Handle touches and mouse movement
    const clientX = evt.touches
      ? evt.touches[evt.touches.length - 1].clientX
      : evt.clientX
    const clientY = evt.touches
      ? evt.touches[evt.touches.length - 1].clientY
      : evt.clientY

    const rect = evt.target.getBoundingClientRect()
    const tgtX = rect.left
    const tgtY = rect.top
    const mouseX = clientX
    const mouseY = clientY
    const dragOffsetX = mouseX - tgtX
    const dragOffsetY = mouseY - tgtY

    // Get the window ancestor
    const windowElm = evt.target.closest('.' + classes.window)

    const drag = debounce((evt: DragEvent) => {
      evt.preventDefault()

      // Handle touches AND  mouse movement
      const clientX = evt?.clientX
      const clientY = evt?.clientY
      const newX = clientX - dragOffsetX
      const newY = clientY - dragOffsetY

      windowElm.style.left = `${newX}px`
      windowElm.style.top = `${newY}px`
    }, 5)

    const mouseup = () => {
      // Remove movement event since we have lifted up
      document.removeEventListener('mousemove', drag)
      document.removeEventListener('touchmove', drag)

      document.removeEventListener('mouseup', mouseup)
      document.removeEventListener('touchend', mouseup)
    }

    // Mousemove is added to the document in case the lement can't catch up and the mouse leaves the elemnts zone
    document.addEventListener('mousemove', drag)
    document.addEventListener('touchmove', drag)

    document.addEventListener('mouseup', mouseup)
    document.addEventListener('touchend', mouseup)
  }

  return (
    <div class={classes.window} ref={ref}>
      <div class={classes.topbar} onmousedown={handleMouseDown}>
        <div class={classes.exit} onclick={close}>
          <Close />
        </div>
      </div>

      <div class={classes.inner}>
        <div class={classes.main}>
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
