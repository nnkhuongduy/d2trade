import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import { UserTypes } from './user.types'

import { logInSuccessful, logInFail } from './user.actions'
import { updateRenderedInventory, fetchInventorySuccess, setRenderingInventory } from '../inventory/inventory.actions'
import { refreshUserTempItems } from '../temp-item/temp-item.actions'
import { refreshSlotsState } from '../slot-state/slot-state.actions'
import { refreshQuery } from '../searching/searching.actions'
import { resetHeroFilter } from '../heroes/heroes.actions'
import { resetPriceFilter } from '../price-filter/price-filter.actions'

export function* fetchUserAsync() {
  try {
    const result = yield axios("/users");

    yield put(logInSuccessful(result.data))
  } catch (error) {
    yield put(logInFail(error.message))
  }
}

export function* logOutAsync() {
  yield put(fetchInventorySuccess("user", []))
  yield put(updateRenderedInventory("user", []))
  yield put(setRenderingInventory("user", []))
  yield put(refreshUserTempItems())
  yield put(refreshSlotsState("user"))
  yield put(refreshQuery("user"))
  yield put(resetHeroFilter("user"))
  yield put(resetPriceFilter("user"))
}

export function* fetchUserStart() {
  yield takeLatest(UserTypes.LOG_IN_START, fetchUserAsync)
}

export function* logOutStart() {
  yield takeLatest(UserTypes.LOG_OUT, logOutAsync)
}