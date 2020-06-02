import { all, takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import { logInSuccess, logInFail, logOutSuccess, logOutFail } from './user.actions'
import { fetchInventorySuccess } from '../inventory/inventory.actions'
import { updateStashFinish } from '../stash/stash.actions'

import { UserTypes } from './user.types'

function* logInAsync() {
  try {
    const respone = yield axios('/auth/login/success')

    if (respone.status === 200) {
      yield put(logInSuccess(respone.data.user))
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

export function* userRootSaga() {
  yield all([
    takeLatest(UserTypes.LOG_IN_START, logInAsync),
    takeLatest(UserTypes.LOG_OUT_START, logOutAsync)
  ])
}