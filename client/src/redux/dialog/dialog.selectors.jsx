import { createSelector } from 'reselect'

const selectDialogState = state => state.dialog

export const selectConfirmationState = createSelector([selectDialogState], state => state.confirmation.state)

export const selectConfirmationText = createSelector([selectDialogState], state => state.confirmation.text)

export const selectConfirmationFunc = createSelector([selectDialogState], state => state.confirmation.onConfirm)