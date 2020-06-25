import { all, takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import {
  logInFail, logInSuccess, updatePasswordFail, updatePasswordSuccess, backgroundLogInSuccess, backgroundLogInFail,
  updateInfoFail, updateInfoSuccess, logOutFail, logOutSuccess, logOutStart
} from './admin.actions'
import { enqSnackbar } from '../snackbar/snackbar.actions'
import { toggleBackdrop } from '../backdrop/backdrop.actions'

import { AdminTypes } from './admin.types'

function* logInAsync({ logInObj }) {
  yield put(toggleBackdrop())
  try {
    const respone = yield axios.post('/admin/login', logInObj)

    if (respone.status === 200) {
      yield put(logInSuccess(logInObj))
    }
  } catch (err) {
    yield put(logInFail(err.message))
  }
  yield put(toggleBackdrop())
}

function* updatePasswordAsync({ password }) {
  try {
    const respone = yield axios.put('/admin/password', { password: password })

    if (respone.status === 200) {
      yield put(updatePasswordSuccess())
      yield put(logOutStart())
    } else {
      yield put(updatePasswordFail(respone.statusMessage))
      yield put(enqSnackbar({
        severity: 'error',
        text: 'Cập nhật mật khẩu thất bại!',
        key: new Date().getTime()
      }))
    }
  } catch (err) {
    yield put(updatePasswordFail(err.message))
    yield put(enqSnackbar({
      severity: 'error',
      text: 'Cập nhật mật khẩu thất bại!',
      key: new Date().getTime()
    }))
  }
}

function* updateInfoAsync({ info }) {
  try {
    const respone = yield axios.put('/admin/info', info)

    if (respone.status === 200) {
      yield put(updateInfoSuccess())
      yield put(logOutStart())
    } else {
      yield put(updateInfoFail(respone.statusMessage))
      yield put(enqSnackbar({
        severity: 'error',
        text: 'Cập nhật admin thất bại!',
        key: new Date().getTime()
      }))
    }
  } catch (err) {
    yield put(updateInfoFail(err.message))
    yield put(enqSnackbar({
      severity: 'error',
      text: 'Cập nhật admin thất bại!',
      key: new Date().getTime()
    }))
  }
}


function* backgroundLogInAsync() {
  try {
    const respone = yield axios('/admin/login')

    if (respone.status === 200)
      yield put(backgroundLogInSuccess(respone.data))
    else yield put(backgroundLogInFail(respone.statusMessage))
  } catch (err) {
    yield put(backgroundLogInFail(err.message))
  }
}

function* logOutAsync() {
  try {
    const respone = yield axios('/admin/logout')

    if (respone.status === 200)
      yield put(logOutSuccess())
    else yield put(logOutFail(respone.statusMessage))
  } catch (err) {
    yield put(logOutFail(err.message))
  }
}

export function* adminRootSagas() {
  yield all([
    takeLatest(AdminTypes.LOG_IN_START, logInAsync),
    takeLatest(AdminTypes.UPDATE_PASSWORD_START, updatePasswordAsync),
    takeLatest(AdminTypes.UPDATE_INFO_START, updateInfoAsync),
    takeLatest(AdminTypes.BACKGROUND_LOG_IN_START, backgroundLogInAsync),
    takeLatest(AdminTypes.LOG_OUT_START, logOutAsync)
  ])
}