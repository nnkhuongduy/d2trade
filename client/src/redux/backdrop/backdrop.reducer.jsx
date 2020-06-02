import { BackdropTypes } from './backdrop.types'

const INITIAL_STATE = {
  state: false,
}

const backdropReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BackdropTypes.SET_BACKDROP:
      return {
        ...state,
        state: action.state
      }

    default:
      return state;
  }
}

export default backdropReducer