import { takeLatest, all, put } from 'redux-saga/effects'
import axios from 'axios'

import { fetchOffersSuccess, fetchOffersFail } from './offers.actions'

import { OffersTypes } from './offers.types'

function* fetchOffersAsync() {
  try {
    const respone = yield axios('/admin/offers')

    if (respone.status === 200) {
      let index = 0;

      respone.data.forEach(offer => {
        offer.index = ++index

        offer.botTotalPrice = offer.bot_items.reduce((accumulator, item) => accumulator + parseInt(item.vnd_price.replace(/,/g, '')), 0)
        offer.userTotalPrice = offer.user_items.reduce((accumulator, item) => accumulator + parseInt(item.vnd_price.replace(/,/g, '')), 0)

        offer.profit = offer.userTotalPrice - offer.botTotalPrice
      })

      yield put(fetchOffersSuccess(respone.data.sort((a, b) => b.index - a.index)))
    }
    else yield put(fetchOffersFail(respone.statusText))
  } catch (err) {
    put(fetchOffersFail(err.message))
  }
}

export function* offersRootSaga() {
  yield all([
    takeLatest(OffersTypes.FETCH_OFFERS_START, fetchOffersAsync)
  ])
}