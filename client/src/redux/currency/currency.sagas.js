import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import { fetchCurrencySuccess, fetchCurrencyFailure } from './currency.actions'

import { CurrencyTypes } from './currency.types'

export function* fetchCurrencyRateAsync() {
  try {
    const result = yield axios('/currency/rate')

    if (result.status === 200) {
      yield put(fetchCurrencySuccess(result.data))
    } else {
      yield put(fetchCurrencyFailure(result.message))
    }

  } catch (err) {
    yield put(fetchCurrencyFailure(err.message))
  }
}

export function* fetchCurrencyRateStart() {
  yield takeLatest(CurrencyTypes.FETCH_CURRENCY_RATE_START, fetchCurrencyRateAsync)
}