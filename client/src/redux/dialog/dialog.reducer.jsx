import { DialogTypes } from './dialog.types'

const INITIAL_STATE = {
  confirmation: {
    state: false,
    text: null,
    onConfirm: null
  }
}

const dialogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DialogTypes.TOGGLE_CONFIRMATION_DIALOG:
      return {
        ...state,
        confirmation: {
          ...state.confirmation,
          state: !state.confirmation.state,
          text: action.text ? action.text : null,
          onConfirm: action.onConfirm
        }
      }

    default:
      return state
  }
}

export default dialogReducer