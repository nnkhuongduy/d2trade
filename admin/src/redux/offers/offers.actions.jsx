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