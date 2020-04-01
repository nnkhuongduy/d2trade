import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import { UserTypes } from './user.types'

import { logInSuccessful, logInFail } from './user.actions'

export function* fetchUserAsync() {
  try {
    const result = yield axios("/users");

    yield put(logInSuccessful(result.data))
  } catch (error) {
    yield put(logInFail(error.message))
  }


}

export function* fetchUserStart() {
  yield takeLatest(UserTypes.LOG_IN_START, fetchUserAsync)
}