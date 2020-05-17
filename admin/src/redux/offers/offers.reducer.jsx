import { OffersTypes } from './offers.types'

const INITIAL_STATE = {
  offers: null,
  isFetching: false,
  message: null
}

const offersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OffersTypes.FETCH_OFFERS_START:
      return {
        ...state,
        isFetching: true,
      }

    case OffersTypes.FETCH_OFFERS_SUCCESS:
      return {
        ...state,
        offers: action.offers,
        isFetching: false,
      }

    case OffersTypes.FETCH_OFFERS_FAIL:
      return {
        ...state,
        isFetching: false,
        message: action.message
      }

    default:
      return state
  }
}

export default offersReducer