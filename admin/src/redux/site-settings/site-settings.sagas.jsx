import { all, takeLatest, put, select } from 'redux-saga/effects'
import axios from 'axios'

import { fetchCurrencyRateSuccess, fetchCurrencyRateFail, fetchSiteSettingsSuccess } from './site-settings.actions'

import { selectSiteSettings } from './site-settings.selectors'

import { SiteSettingsTypes } from './site-settings.types'

function* fetchCurrencyRateAsync() {
  try {
    const respone = yield axios('/currency/rate')
    const currentState = yield select(selectSiteSettings)

    if (respone.status === 200) {
      if (!currentState) yield put(fetchSiteSettingsSuccess({}))
      yield put(fetchCurrencyRateSuccess(respone.data))
    }
    else yield put(fetchCurrencyRateFail(respone.statusText))
  } catch (err) {
    yield put(fetchCurrencyRateFail(err.message))
  }
}

export function* siteSettingsRootSaga() {
  yield all([
    takeLatest(SiteSettingsTypes.FETCH_CURRENCY_RATE_START, fetchCurrencyRateAsync)
  ])
}