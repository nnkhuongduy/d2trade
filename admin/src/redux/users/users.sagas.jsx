import { all, takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import { fetchUsersStart, fetchUsersSuccess, fetchUsersFail, setBalanceSuccess, setBalanceFail } from './users.actions'
import { toggleBackdrop } from '../backdrop/backdrop.actions'
import { enqSnackbar } from '../snackbar/snackbar.actions'

import { UsersTypes } from './users.types'

export function* fetchUsersAsync() {
  try {
    const respone = yield axios('/admin/users');

    if (respone.status === 200) {
      let index = 1;

      yield respone.data.forEach(user => {
        user.index = index;
        index++;
      })

      yield put(fetchUsersSuccess(respone.data))
    }
    else yield put(fetchUsersFail(respone.statusText))
  } catch (err) {
    yield put(fetchUsersFail(err.message))
  }
}

export function* setBalanceAsync({ steamId, value, actionType, ...action }) {
  yield put(toggleBackdrop())
  try {

    const postObj = {
      steamId: steamId,
      value: value,
      type: actionType
    }

    const respone = yield axios.post('/admin/user/balance/edit', postObj)

    if (respone.status === 200) {
      yield put(enqSnackbar({ severity: 'success' }))
      yield put(setBalanceSuccess())
      yield put(fetchUsersStart())
    }
    else {
      yield put(enqSnackbar({ severity: 'error' }))
      yield put(setBalanceFail(respone.statusText))
    }
  } catch (err) {
    yield put(enqSnackbar({ severity: 'error' }))
    yield put(setBalanceFail(err.message))
  }
  yield put(toggleBackdrop())
}

export function* usersRootSaga() {
  yield all([
    takeLatest(UsersTypes.FETCH_USERS_START, fetchUsersAsync),
    takeLatest(UsersTypes.SET_BALANCE_START, setBalanceAsync),
  ])
}