import { ClientStatesTypes } from './client-states.types';

export const toggleBlackScreen = () => ({
  type: ClientStatesTypes.TOGGLE_BLACK_SCREEN,
})

export const fetchOfferStatusStart = () => ({
  type: ClientStatesTypes.FETCH_OFFER_STATUS_START,
})

export const fetchOfferStatusSuccess = status => ({
  type: ClientStatesTypes.FETCH_OFFER_STATUS_SUCCESS,
  payload: status
})

export const fetchOfferStatusFailure = status => ({
  type: ClientStatesTypes.FETCH_OFFER_STATUS_FAILURE,
  payload: status
})

export const resetOfferStatus = () => ({
  type: ClientStatesTypes.RESET_OFFER_STATUS
})

export const resetClientState = () => ({
  type: ClientStatesTypes.RESET_CLIENT_STATE
})
