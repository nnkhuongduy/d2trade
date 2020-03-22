import { ClientStatesTypes } from './client-states.types';

export const toggleBlackScreen = () => ({
  type: ClientStatesTypes.TOGGLE_BLACK_SCREEN,
})

export const setServerOfferSuccessState = state => ({
  type: ClientStatesTypes.SET_SERVER_OFFER_SUCCESS_STATE,
  payload: state
})
