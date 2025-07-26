const {
  ui: {
    ModalRoot,
    ModalHeader,
    ModalBody,
    ModalConfirmFooter,
  }
} = shelter

export const basicModal = (props: BasicModalProps) => (
  <ModalRoot>
    <ModalHeader>{props.header}</ModalHeader>
    <ModalBody>{props.body}</ModalBody>
  </ModalRoot>
)

export const confirmModal = (props: ConfirmationModalProps) => (
  <ModalRoot>
    <ModalHeader
      close={props.onCancel}
    >{props.header}</ModalHeader>
    <ModalBody>{props.body}</ModalBody>
    <ModalConfirmFooter
      onConfirm={props.onConfirm}
      onCancel={props.onCancel}
      confirmText={props.confirmText || 'Confirm'}
      cancelText={props.cancelText || 'Cancel'}
      type={props.type}
    />
  </ModalRoot>
)