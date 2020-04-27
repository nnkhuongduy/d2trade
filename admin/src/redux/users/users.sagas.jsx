import { all, takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import { fetchUsersStart, fetchUsersSuccess, fetchUsersFail, editBalanceSuccess, editBalanceFail, modifyBalanceSuccess, modifyBalanceFail } from './users.actions'

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

export function* editBalanceAsync({ steamId, value, ...action }) {
  try {
    const postObj = {
      steamId: steamId,
      value: parseInt(value)
    }

    const respone = yield axios.post('/admin/user/balance/edit', postObj)

    if (respone.status === 200)
      yield put(editBalanceSuccess())
    else yield put(editBalanceFail(respone.statusText))
  } catch (err) {
    yield put(editBalanceFail(err.message))
  }
}

export function* modifyBalanceAsync({ steamId, value, ...action }) {
  try {
    const postObj = {
      steamId: steamId,
      value: parseInt(value)
    }

    const respone = yield axios.post('/admin/user/balance/modify', postObj)

    if (respone.status === 200)
      yield put(modifyBalanceSuccess())
    else yield put(modifyBalanceFail(respone.statusText))
  } catch (err) {
    yield put(modifyBalanceFail(err.message))
  }
}

export function* requestBalanceSuccessAsync() {
  yield put(fetchUsersStart());
}

export function* usersRootSaga() {
  yield all([
    takeLatest(UsersTypes.FETCH_USERS_START, fetchUsersAsync),
    takeLatest(UsersTypes.EDIT_BALANCE_START, editBalanceAsync),
    takeLatest(UsersTypes.MODIFY_BALANCE_START, modifyBalanceAsync),
    takeLatest(UsersTypes.EDIT_BALANCE_SUCCESS, requestBalanceSuccessAsync),
    takeLatest(UsersTypes.MODIFY_BALANCE_SUCCESS, requestBalanceSuccessAsync),
  ])
}