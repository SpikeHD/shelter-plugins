const {
  ui: { openConfirmationModal },
} = shelter

const { invoke, process, event } = (window as any).__TAURI__

export const onLoad = async () => {
  const config = JSON.parse(await invoke('read_config_file'))
  // This returns an array of what to update, if anything.
  const updateCheck = await invoke('update_check')

  const doUpdate = () => {
    invoke('do_update', {
      toUpdate: updateCheck,
    })
  }

  console.log(`[Updater] Dorion things to update: ${updateCheck}`)

  if (config.update_notify !== undefined && !config.update_notify) return

  if (updateCheck.includes('vencordorion') || updateCheck.includes('dorion')) {
    // If autoupdate is enabled, just do it, otherwise ask the user.
    if (config.autoupdate) {
      // We should still warn that Dorion is going to restart
      if (updateCheck.includes('dorion')) {
        openConfirmationModal({
          header: 'Dorion Update',
          body: 'A Dorion update has been fetched, and Dorion will restart momentarily.',
          confirmText: 'Got it!',
          type: 'neutral',
        }).then(
          () => doUpdate(),
          () => {},
        )
        return
      }

      doUpdate()
      return
    }

    openConfirmationModal({
      header: 'Updates Available!',
      body: 'There are Dorion updates available. Would you like to apply them? This notification can be disabled in Dorion Settings',
      confirmText: 'Yes please!',
      cancelText: 'Nope!',
      type: 'neutral',
    }).then(
      () => doUpdate(),
      () => {},
    )
  }

  // Listen for update_complete eevent
  event.listen('update_complete', () => {
    openConfirmationModal({
      header: 'Update Complete!',
      body: 'The update has been applied! Please restart to apply the changes.',
      confirmText: 'Okay!',
      type: 'neutral',
    }).then(
      () => process.relaunch(),
      () => {},
    )
  })
}
