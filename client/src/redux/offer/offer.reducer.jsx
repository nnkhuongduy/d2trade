import { OfferTypes } from './offer.types'

const INITIAL_STATE = {
  dialog: {
    url: false,
    offer: false
  },
  isPosting: false,
  isOffering: false,
  isOfferSuccess: undefined,
  error: null
}

const offerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OfferTypes.SET_DIALOG_URL:
      return {
        ...state,
        dialog: {
          ...state.dialog,
          url: action.state
        }
      }

    case OfferTypes.SET_DIALOG_OFFER:
      return {
        ...state,
        dialog: {
          ...state.dialog,
          offer: action.state
        }
      }

    case OfferTypes.POST_URL_START:
      return {
        ...state,
        isPosting: true,
        error: null
      }

    case OfferTypes.POST_URL_SUCCESS:
      return {
        ...state,
        isPosting: false,
      }

    case OfferTypes.POST_URL_FAIL:
      return {
        ...state,
        isPosting: false,
        error: action.message
      }

    case OfferTypes.POST_OFFER_START:
      return {
        ...state,
        isOffering: true,
        isOfferSuccess: undefined,
        error: null
      }

    case OfferTypes.POST_OFFER_SUCCESS:
      return {
        ...state,
        isOffering: false,
      }

    case OfferTypes.POST_OFFER_FAIL:
      return {
        ...state,
        isOffering: false,
        error: action.message
      }

    default:
      return state
  }
}

export default offerReducer