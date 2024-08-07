import { css, classes } from './Window.scss'
import Editor from './Editor'
import { Close } from './Close'
import { debounce } from '../util'

const {
  ui: { injectCss },
} = shelter

let injectedCss = false

// Handle touches and mouse movement
const getClientCoordinates = ({ touches, clientX, clientY }) => {
  if (touches) {
    return [
      touches[touches.length - 1].clientX,
      touches[touches.length - 1].clientY
    ]
  }
  return [clientX, clientY]
}

const handleDragging = (onDrag: (evt: DragEvent) => void) => {
  const drag = debounce((evt: DragEvent) => {
    evt.preventDefault()
    onDrag(evt)
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

  const topbarMouseDown = (evt) => {
    evt.preventDefault()
    const [oldClientX, oldClientY] = getClientCoordinates(evt)

    // Get the window ancestor
    const windowElm = evt.target.closest('.' + classes.window)

    const rect = windowElm.getBoundingClientRect()
    const dragOffsetX = oldClientX - rect.left
    const dragOffsetY = oldClientY - rect.top


    handleDragging((evt) => {
      const newX = evt.clientX - dragOffsetX
      const newY = evt.clientY - dragOffsetY

      windowElm.style.left = `${newX}px`
      windowElm.style.top = `${newY}px`
    })
  }

  const resizeMouseDown = (evt) => {
    evt.preventDefault()
    const [oldClientX, oldClientY] = getClientCoordinates(evt)
  
    // Get the window ancestor
    const windowElm = evt.target.closest('.' + classes.window)
    const rect = windowElm.getBoundingClientRect()
    
    handleDragging((evt) => {
      const newWidth = rect.width + evt.clientX - oldClientX
      const newHeight = rect.height + evt.clientY - oldClientY

      windowElm.style.width = `${newWidth}px`
      windowElm.style.height = `${newHeight}px`
    })
  }

  return (
    <div class={classes.window} ref={ref} style={{
      height: '400px',
      width: '30vw'
    }}>
      <div class={classes.resize} onmousedown={resizeMouseDown}/>
      <div class={classes.content}>
        <div class={classes.topbar} onmousedown={topbarMouseDown}>
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
    </div>
  )
}
