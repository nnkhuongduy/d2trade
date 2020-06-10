import { OffersTypes } from './offers.types'

export const fetchOffersStart = () => ({
  type: OffersTypes.FETCH_OFFERS_START
})

export const fetchOffersSuccess = offers => ({
  type: OffersTypes.FETCH_OFFERS_SUCCESS,
  offers: offers
})

export const fetchOffersFail = message => ({
  type: OffersTypes.FETCH_OFFERS_FAIL,
  message: message
})

export const clearErrorOffersStart = () => ({
  type: OffersTypes.CLEAR_ERROR_OFFERS_START
})

export const clearErrorOffersSuccess = () => ({
  type: OffersTypes.CLEAR_ERROR_OFFERS_SUCCESS
})

export const clearErrorOffersFail = () => ({
  type: OffersTypes.CLEAR_ERROR_OFFERS_FAIL
})