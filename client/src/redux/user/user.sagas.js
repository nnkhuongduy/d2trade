import { takeLatest, put, select } from 'redux-saga/effects'
import axios from 'axios'

import { UserTypes } from './user.types'

import { logInSuccessful, logInFail, editUserInfoFinish } from './user.actions'
import { updateRenderedInventory, fetchInventorySuccess, setRenderingInventory, refreshInventory } from '../inventory/inventory.actions'
import { refreshTempItems } from '../temp-item/temp-item.actions'
import { refreshSlotsState } from '../slot-state/slot-state.actions'
import { refreshQuery } from '../searching/searching.actions'
import { resetHeroFilter } from '../heroes/heroes.actions'
import { resetPriceFilter } from '../price-filter/price-filter.actions'

import { selectCurrentUser } from './user.selectors'

export function* fetchUserAsync() {
  try {
    const respone = yield axios('/auth/login/success', {
      method: "GET",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })

    if (respone.status === 200)
      yield put(logInSuccessful(respone.data.user))
    else put(logInFail(respone.statusText))
  } catch (error) {
    yield put(logInFail(error.message))
  }
}

export function* logOutAsync() {
  yield put(fetchInventorySuccess("user", []))
  yield put(updateRenderedInventory("user", []))
  yield put(setRenderingInventory("user", []))
  yield put(refreshTempItems("user"))
  yield put(refreshSlotsState("user"))
  yield put(refreshQuery("user"))
  yield put(resetHeroFilter("user"))
  yield put(resetPriceFilter("user"))
  yield put(refreshInventory("bot"));

  yield axios('/auth/logout');
}

export function* editUserInfoAsync({ infoObj }) {
  try {
    const currentUser = yield select(selectCurrentUser)

    const postObj = {
      info: infoObj,
      userId: currentUser.steamid
    }

    const result = yield axios('/edituser', {
      method: 'POST',
      data: postObj,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })

    if (result.status === 200) {
      yield put(editUserInfoFinish(infoObj, true))
    } else yield put(editUserInfoFinish(null, false))
  } catch (err) {
    yield put(editUserInfoFinish(null, false))
  }

}

export function* fetchUserStart() {
  yield takeLatest(UserTypes.LOG_IN_START, fetchUserAsync)
}

export function* logOutStart() {
  yield takeLatest(UserTypes.LOG_OUT, logOutAsync)
}

export function* editUserInfoStart() {
  yield takeLatest(UserTypes.EDIT_USER_INFO, editUserInfoAsync)
}