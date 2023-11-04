import GameCard from './GameCard'
import { css, classes } from './RegisteredGames.scss'

const {
  ui: {
    Divider,
    Header,
    Button,
    HeaderTags,
    TextBox,
    Text,
    injectCss
  },
  solid: {
    createSignal,
    createEffect
  },
  plugin: {
    store
  }
} = shelter

let injectedCss = false

export default () => {
  if (!injectedCss) {
    injectedCss = true
    injectCss(css)
  }

  return (
    <>
      <Header tag={HeaderTags.H1} class={classes.shead}>Registered Games</Header>
      <Text
        class={classes.description}
      >
        ShelteRPC will automatically update your status based on the game you're playing (if detectable). You can also manually add games to this list if it isn't being detected.
      </Text>

      <Divider mt={20} mb={20} />

      <GameCard
        type='none'
      />

      <Text
        class={classes.addIt}
      >
        Not seeing your game? Too bad, you can't add it quite yet.
      </Text>

      { /* TODO: This will be where the list of games goes */ }
      <Header class={classes.addhead}>Added Games</Header>
    </>
  )
}