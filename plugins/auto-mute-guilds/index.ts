const {
  flux: {
    dispatcher
  }
} = shelter

const unsubscribe = dispatcher.subscribe('INVITE_ACCEPT_SUCCESS', async (payload) => {
  const { guild_id } = payload

  // Mute guild
  dispatcher.dispatch(
    {
      type: 'USER_GUILD_SETTINGS_GUILD_UPDATE',
      guildId: guild_id,
      settings: {
        muted: true,
        mute_config: {
          selected_time_window: -1,
          end_time: null
        }
      }
    }
  )
})

export const onUnload = () => {
  unsubscribe()
}