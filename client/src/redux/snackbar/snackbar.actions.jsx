import { SnackbarTypes } from './snackbar.types'

export const enqSnackbar = snackbar => ({
  type: SnackbarTypes.ENQ_SNACKBAR,
  snackbar: snackbar
})

export const deqSnackbar = () => ({
  type: SnackbarTypes.DEQ_SNACKBAR,
})