import { OfferTypes } from './offer.types'

export const setUrlDialog = state => ({
  type: OfferTypes.SET_DIALOG_URL,
  state: state
})

export const setOfferDialog = state => ({
  type: OfferTypes.SET_DIALOG_OFFER,
  state: state
})

export const postUrlStart = url => ({
  type: OfferTypes.POST_URL_START,
  url: url
})

export const postUrlSuccess = () => ({
  type: OfferTypes.POST_URL_SUCCESS,
})

export const postUrlFail = message => ({
  type: OfferTypes.POST_URL_FAIL,
  message: message
})

export const postOfferStart = () => ({
  type: OfferTypes.POST_OFFER_START,
})

export const postOfferSuccess = () => ({
  type: OfferTypes.POST_OFFER_SUCCESS,
})

export const postOfferFail = message => ({
  type: OfferTypes.POST_OFFER_FAIL,
  message: message
})