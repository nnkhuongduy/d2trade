import { all, takeLatest, put, select } from 'redux-saga/effects'
import axios from 'axios'

import {
  logInSuccess, logInFail, logOutSuccess, logOutFail, fetchOffersSuccess, fetchOffersFail
} from './user.actions'
import { fetchInventorySuccess } from '../inventory/inventory.actions'
import { updateStashFinish } from '../stash/stash.actions'

import { UserTypes } from './user.types'
import { selectCurrentUser } from './user.selectors'



function* logInAsync() {
  try {
    const respone = yield axios('/auth/login/success')

    if (respone.status === 200) {
      let index = 0;

      yield respone.data.user.offers.forEach(offer => offer.index = ++index)

      yield put(logInSuccess(respone.data.user))
      yield put(fetchOffersSuccess(respone.data.user.offers))
    }
    else {
      yield put(logInFail(respone.statusMessage))
    }
  } catch (err) {
    yield put(logInFail(err.message))
  }
}

function* logOutAsync() {
  try {
    const respone = yield axios('/auth/logout')

    if (respone.status === 200) {
      yield put(logOutSuccess())
      yield put(fetchInventorySuccess('user', null))
      yield put(updateStashFinish('user', []))
    }
    else {
      yield put(logOutFail(respone.statusMessage))
    }
  } catch (err) {
    yield put(logOutFail(err.message))
  }
}

function* fetchOffersAsync() {
  try {
    const user = yield select(selectCurrentUser)

    const respone = yield axios(`/users/${user.steamid}/offers`)

    if (respone.status === 200) {
      let index = 0;

      yield respone.data.forEach(offer => offer.index = ++index)

      yield put(fetchOffersSuccess(respone.data))
    } else {
      yield put(fetchOffersFail(respone.statusMessage))
    }
  } catch (err) {
    yield put(fetchOffersFail(err.message))
  }
}

export function* userRootSaga() {
  yield all([
    takeLatest(UserTypes.LOG_IN_START, logInAsync),
    takeLatest(UserTypes.LOG_OUT_START, logOutAsync),
    takeLatest(UserTypes.FETCH_OFFERS_START, fetchOffersAsync)
  ])
}