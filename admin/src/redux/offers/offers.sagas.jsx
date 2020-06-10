import { takeLatest, all, put } from 'redux-saga/effects'
import axios from 'axios'

import { fetchOffersSuccess, fetchOffersFail, clearErrorOffersSuccess, clearErrorOffersFail, fetchOffersStart } from './offers.actions'
import { enqSnackbar } from '../snackbar/snackbar.actions'

import { OffersTypes } from './offers.types'

function* fetchOffersAsync() {
  try {
    const respone = yield axios('/admin/offers')

    if (respone.status === 200) {
      let index = 0;

      respone.data.forEach(offer => {
        offer.index = ++index

        offer.botTotalPrice = offer.bot_items.reduce((accumulator, item) => accumulator + item.prices.vnd, 0)
        offer.userTotalPrice = offer.user_items.reduce((accumulator, item) => accumulator + item.prices.vnd, 0)

        offer.profit = (offer.userTotalPrice + offer.user_balance) - offer.botTotalPrice
      })

      yield put(fetchOffersSuccess(respone.data))
    }
    else yield put(fetchOffersFail(respone.statusText))
  } catch (err) {
    put(fetchOffersFail(err.message))
  }
}

function* clearErrorOffersAsync() {
  try {
    const respone = yield axios('/admin/offers/clear')

    if (respone.status === 200) {
      yield put(clearErrorOffersSuccess())
      yield put(fetchOffersStart())
      yield put(enqSnackbar({
        severity: 'success',
        text: 'Xóa offers lỗi thành công!',
        key: new Date().getTime()
      }))
    }
    else {
      yield put(clearErrorOffersFail())
      yield put(enqSnackbar({
        severity: 'error',
        text: 'Xóa offers lỗi thất bại!',
        key: new Date().getTime()
      }))
    }
  } catch (err) {
    yield put(clearErrorOffersFail())
    yield put(enqSnackbar({
      severity: 'error',
      text: 'Xóa offers lỗi thất bại!',
      key: new Date().getTime()
    }))
  }
}

export function* offersRootSaga() {
  yield all([
    takeLatest(OffersTypes.FETCH_OFFERS_START, fetchOffersAsync),
    takeLatest(OffersTypes.CLEAR_ERROR_OFFERS_START, clearErrorOffersAsync)
  ])
}