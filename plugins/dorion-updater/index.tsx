import { invoke, process, event, appName } from '../../api/api.js'
import { t } from '../../util/i18n.js'

const {
  ui: {
    openModal,
    ModalRoot,
    ModalHeader,
    ModalBody,
    ModalConfirmFooter
  },
} = shelter

const confirmModal = (props: ConfirmationModalProps) => (
  <ModalRoot>
    <ModalHeader
      close={props.onCancel}
    >{props.header}</ModalHeader>
    <ModalBody>{props.body}</ModalBody>
    <ModalConfirmFooter
      onConfirm={props.onConfirm}
      onCancel={props.onCancel}
      confirmText={props.confirmText}
      cancelText={props.cancelText}
      type={props.type}
    />
  </ModalRoot>
)

const load = async () => {
  console.log('[Updater] Checking for updates...')
  const config = JSON.parse(await invoke('read_config_file'))
  // This returns an array of what to update, if anything.
  const updateCheck = await invoke('update_check')

  const doUpdate = () => {
    invoke('do_update', {
      toUpdate: updateCheck,
    })
  }

  console.log(`[Updater] ${appName} things to update: ${updateCheck}`)

  if (config.update_notify !== undefined && !config.update_notify) return

  if (updateCheck.includes('dorion')) {
    // If autoupdate is enabled, just do it, otherwise ask the user.
    if (config.autoupdate) {
      // We should still warn that Dorion is going to restart
      openModal((props) => confirmModal({
        header: t('dorion_updater.update_title').replace('{{appName}}', appName),
        body: t('dorion_updater.update_body').replace(/{{appName}}/g, appName),
        confirmText: t('common.got_it'),
        type: 'neutral',
        onConfirm: () => doUpdate(),
        onCancel: props.close,
      }))

      doUpdate()
      return
    }

    openModal((props) => confirmModal({
      header: t('dorion_updater.updates_available'),
      body: t('dorion_updater.updates_available_body').replace(/{{appName}}/g, appName),
      confirmText: t('common.yes_please'),
      cancelText: t('common.nope'),
      type: 'neutral',
      onConfirm: () => doUpdate(),
      onCancel: props.close,
    }))
  }

  // Listen for update_complete event
  event.once('update_complete', () => {
    openModal((props) => confirmModal({
      header: t('dorion_updater.update_complete'),
      body: t('dorion_updater.update_complete_body'),
      confirmText: t('common.okay'),
      type: 'neutral',
      onConfirm: () => process.relaunch(),
      onCancel: props.close,
    }))
  })
}

export const onUnload = () => {}

load()