import { DialogTypes } from './dialog.types'

export const toggleConfirmation = (text = '', onConfirm) => ({
  type: DialogTypes.TOGGLE_CONFIRMATION_DIALOG,
  text: text,
  onConfirm: onConfirm
})