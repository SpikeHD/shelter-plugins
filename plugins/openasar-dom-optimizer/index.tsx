/**
 * OpenAsar has this cool little optimization technique that delays some operations when
 * switching channels or servers, so that the switch is faster.
 * 
 * https://github.com/GooseMod/OpenAsar/blob/ef4470849624032a8eb7265eabd23158aa5a2356/src/mainWindow.js#L99
 * https://github.com/GooseMod/OpenAsar/wiki/DOM-Optimizer
 */

const {
  plugin: {
    store
  },
  ui: {
    SwitchItem,
    Text
  }
} = shelter

const _removeChild = Element.prototype.removeChild
const _appendChild = Element.prototype.appendChild

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const optimize = (orig: Function) =>
  function (...args: unknown[]) {
    if (
      // @ts-expect-error womp womp
      typeof args[0].className === 'string' &&
      // @ts-expect-error womp womp
      args[0].className.indexOf('activity') !== -1
    )
      return setTimeout(() => orig.apply(this, args), 100)

    return orig.apply(this, args)
  }

if (store.remove) {
  Element.prototype.removeChild = optimize(Element.prototype.removeChild)
}

// if (store.append) {
//   Element.prototype.appendChild = optimize(Element.prototype.appendChild)
// }

export const settings = () => (
  <>
    <Text>
      See <a href="https://github.com/GooseMod/OpenAsar/wiki/DOM-Optimizer">the OpenAsar wiki</a> for more information on how this works!
    </Text>
    <br />
    <br />
    {/*
    <SwitchItem
      value={store.append}
      onChange={(v) => {
        store.append = v
        if (v) {
          Element.prototype.appendChild = optimize(_appendChild)
        } else {
          Element.prototype.appendChild = _appendChild
        }
      }}
    >
      Apply to Element.appendChild
    </SwitchItem>
    */}

    <SwitchItem
      value={store.remove}
      onChange={(v) => {
        store.remove = v
        if (v) {
          Element.prototype.removeChild = optimize(_removeChild)
        } else {
          Element.prototype.removeChild = _removeChild
        }
      }}
    >
      Apply to Element.removeChild
    </SwitchItem>
  </>
)