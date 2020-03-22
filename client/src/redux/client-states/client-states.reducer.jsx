import { ClientStatesTypes } from './client-states.types';

const INITIAL_STATE = {
  blackScreenState: false,
  serverOfferSuccessState: 0
}

const clientStatesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ClientStatesTypes.TOGGLE_BLACK_SCREEN:
      return {
        ...state,
        blackScreenState: !state.blackScreenState
      }
    case ClientStatesTypes.SET_SERVER_OFFER_SUCCESS_STATE:
      return {
        ...state,
        serverOfferSuccessState: action.payload
      }
    default:
      return state
  }
}

export default clientStatesReducer