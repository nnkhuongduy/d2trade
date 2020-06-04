import { UserTypes } from './user.types'

export const logInStart = () => ({
  type: UserTypes.LOG_IN_START
})

export const logInSuccess = user => ({
  type: UserTypes.LOG_IN_SUCCESS,
  user: user
})

export const logInFail = message => ({
  type: UserTypes.LOG_IN_FAIL,
  message: message
})

export const logOutStart = () => ({
  type: UserTypes.LOG_OUT_START
})

export const logOutSuccess = () => ({
  type: UserTypes.LOG_OUT_SUCCESS,
})

export const logOutFail = message => ({
  type: UserTypes.LOG_OUT_FAIL,
  message: message
})

export const fetchOffersStart = () => ({
  type: UserTypes.FETCH_OFFERS_START
})

export const fetchOffersSuccess = offers => ({
  type: UserTypes.FETCH_OFFERS_SUCCESS,
  offers: offers
})

export const fetchOffersFail = message => ({
  type: UserTypes.FETCH_OFFERS_FAIL,
  message: message
})