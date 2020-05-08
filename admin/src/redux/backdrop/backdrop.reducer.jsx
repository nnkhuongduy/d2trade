import { BackdropTypes } from './backdrop.types'

const INITIAL_STATE = {
  backdrop: false
}

const backdropReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BackdropTypes.TOGGLE_BACK_DROP:
      return {
        ...state,
        backdrop: !state.backdrop
      }

    default:
      return state
  }
}

export default backdropReducer