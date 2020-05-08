import { SnackbarTypes } from './snackbar.types'

const INITIAL_STATE = {
  snackbars: []
}

const snackbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SnackbarTypes.ENQ_SNACKBAR:
      return {
        ...state,
        snackbars: [...state.snackbars, action.snackbar]
      }

    case SnackbarTypes.DEQ_SNACKBAR:
      return {
        ...state,
        snackbars: state.snackbars.slice(1)
      }

    default:
      return state
  }
}

export default snackbarReducer