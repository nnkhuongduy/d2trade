import { all, takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import {
  logInFail, logInSuccess, updatePasswordFail, updatePasswordSuccess, backgroundLogInSuccess, backgroundLogInFail
} from './admin.actions'
import { enqSnackbar } from '../snackbar/snackbar.actions'

import { AdminTypes } from './admin.types'

function* logInAsync({ logInObj }) {
  try {
    const respone = yield axios.post('/admin/login', logInObj)

    if (respone.status === 200) {
      yield put(logInSuccess(logInObj))
    }
  } catch (err) {
    yield put(logInFail(err.message))
  }
}

function* updatePasswordAsync({ password }) {
  try {
    const respone = yield axios.put('/admin/password', { password: password })

    if (respone.status === 200) {
      yield put(updatePasswordSuccess())
      yield put(enqSnackbar({
        severity: 'success',
        text: 'Cập nhật mật khẩu thành công!',
        key: new Date().getTime()
      }))
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

export function* adminRootSagas() {
  yield all([
    takeLatest(AdminTypes.LOG_IN_START, logInAsync),
    takeLatest(AdminTypes.UPDATE_PASSWORD_START, updatePasswordAsync),
    takeLatest(AdminTypes.BACKGROUND_LOG_IN_START, backgroundLogInAsync)
  ])
}