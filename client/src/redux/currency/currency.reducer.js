import { CurrencyTypes } from './currency.types'

const INITIAL_STATE = {
  currency: 'vnd',
  isFetching: false,
  currencyRate: null,
  errorMessage: null
}

export const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CurrencyTypes.SET_CURRENCY:
      return {
        ...state,
        currency: action.payload
      }

    case CurrencyTypes.FETCH_CURRENCY_RATE_START:
      return {
        ...state,
        isFetching: true,
      }

    case CurrencyTypes.FETCH_CURRENCY_RATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currencyRate: action.currencyRate
      }

    case CurrencyTypes.FETCH_CURRENCY_RATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.errorMessage
      }

    default:
      return state
  }
}

export default currencyReducer;