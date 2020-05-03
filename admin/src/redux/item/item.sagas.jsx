import { all, takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import { fetchItemFail, fetchItemSuccess } from './item.actions'

import { ItemTypes } from './item.types'

export function* fetchItemAsync({ itemName, ...action }) {
  try {
    const respone = yield axios(`/admin/item/${itemName}`)

    if (respone.status === 200)
      yield put(fetchItemSuccess(respone.data))
    else yield put(fetchItemFail(respone.statusText))
  } catch (err) {
    yield put(fetchItemFail(err.message))
  }
}

export function* itemRootSaga() {
  yield all([
    takeLatest(ItemTypes.FETCH_ITEM_START, fetchItemAsync)
  ])
}