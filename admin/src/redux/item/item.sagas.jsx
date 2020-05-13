import { all, takeLatest, put, select } from 'redux-saga/effects'
import axios from 'axios'
import _ from 'lodash'

import {
  fetchItemFail, fetchItemSuccess,
  postItemSuccess, postItemFail,
  fetchItemsSuccess, fetchItemsFail,
} from './item.actions'
import { toggleBackdrop } from '../backdrop/backdrop.actions'
import { enqSnackbar } from '../snackbar/snackbar.actions'

import { selectItems } from './item.selectors'

import { ItemTypes } from './item.types'

export function* fetchItemAsync({ itemName, ...action }) {
  try {
    const respone = yield axios(`/admin/item/${itemName}`)

    if (respone.status === 200) {
      yield put(enqSnackbar({
        severity: 'success',
        text: 'Tìm item trên market thành công!',
        key: new Date().getTime()
      }))
      yield put(fetchItemSuccess(respone.data))
    }
    else {
      yield put(enqSnackbar({
        severity: 'error',
        text: 'Tìm item trên market thất bại!',
        key: new Date().getTime()
      }))
      yield put(fetchItemFail(respone.statusText))
    }
  } catch (err) {
    yield put(enqSnackbar({
      severity: 'error',
      text: 'Tìm item trên market thất bại!',
      key: new Date().getTime()
    }))
    yield put(fetchItemFail(err.message))
  }
}

export function* postItemAsync({ item }) {
  yield put(toggleBackdrop())

  const items = yield select(selectItems)
  const duplicateItems = yield items.filter(exItem => _.trim(exItem.name) === _.trim(item.name))

  if (!duplicateItems.length) {
    try {
      const respone = yield axios.post('/admin/item/new', item)

      if (respone.status === 200) {
        yield put(enqSnackbar({
          severity: 'success',
          key: new Date().getTime()
        }))
        yield put(postItemSuccess())
      }
      else {
        yield put(enqSnackbar({
          severity: 'error',
          key: new Date().getTime()
        }))
        yield put(postItemFail(respone.statusText))
      }
    } catch (err) {
      yield put(enqSnackbar({
        severity: 'error',
        key: new Date().getTime()
      }))
      yield put(postItemFail(err.message))
    }
  } else {
    yield put(enqSnackbar({
      severity: 'error',
      text: 'Lỗi trùng item',
      key: new Date().getTime()
    }))
    yield put(postItemFail('Duplicate item!'))
  }
  yield put(toggleBackdrop())
}

export function* fetchItemsAsync() {
  try {
    const respone = yield axios('/admin/items')

    const data = []

    for (let i = 0; i < 20; i++)
      yield respone.data.forEach((item, index) => data.push({ ...item, key: i * 100 + index }))

    if (respone.status === 200)
      yield put(fetchItemsSuccess(data))
    else yield put(fetchItemsFail())
  } catch (err) {
    yield put(fetchItemsFail())
  }
}

export function* itemRootSaga() {
  yield all([
    takeLatest(ItemTypes.FETCH_ITEM_START, fetchItemAsync),
    takeLatest(ItemTypes.POST_ITEM_START, postItemAsync),
    takeLatest(ItemTypes.FETCH_ITEMS_START, fetchItemsAsync)
  ])
}