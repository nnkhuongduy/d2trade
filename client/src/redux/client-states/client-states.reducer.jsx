import { ClientStatesTypes } from './client-states.types';

const INITIAL_STATE = {
  blackScreenState: false,
  offerStatus: {
    isFetching: false,
    status: null,
    errorMessage: undefined
  }
}

const clientStatesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ClientStatesTypes.TOGGLE_BLACK_SCREEN:
      return {
        ...state,
        blackScreenState: !state.blackScreenState
      }
    case ClientStatesTypes.FETCH_OFFER_STATUS_START:
      return {
        ...state,
        offerStatus: {
          ...state.offerStatus,
          isFetching: true
        }
      }
    case ClientStatesTypes.FETCH_OFFER_STATUS_SUCCESS:
      return {
        ...state,
        offerStatus: {
          ...state.offerStatus,
          isFetching: false,
          status: action.payload
        }
      }
    case ClientStatesTypes.FETCH_OFFER_STATUS_FAILURE:
      return {
        ...state,
        offerStatus: {
          ...state.offerStatus,
          isFetching: false,
          errorMessage: action.payload
        }
      }
    default:
      return state
  }
}

export default clientStatesReducer