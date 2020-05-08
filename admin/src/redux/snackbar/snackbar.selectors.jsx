import { createSelector } from 'reselect'

const selectSnackbarState = state => state.snackbar

export const selectSnackbarQueue = createSelector([selectSnackbarState], state => state.snackbars)

export const selectSnackbars = createSelector([selectSnackbarState], state => state.snackbars)