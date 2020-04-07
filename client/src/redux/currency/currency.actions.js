import { CurrencyTypes } from './currency.types'

export const setCurrency = (currencyType) => ({
  type: CurrencyTypes.SET_CURRENCY,
  payload: currencyType
})

export const fetchCurrencyStart = () => ({
  type: CurrencyTypes.FETCH_CURRENCY_RATE_START
})

export const fetchCurrencySuccess = currencyRate => ({
  type: CurrencyTypes.FETCH_CURRENCY_RATE_SUCCESS,
  currencyRate: currencyRate
})
export const fetchCurrencyFailure = errorMessage => ({
  type: CurrencyTypes.FETCH_CURRENCY_RATE_FAILURE,
  errorMessage: errorMessage
})