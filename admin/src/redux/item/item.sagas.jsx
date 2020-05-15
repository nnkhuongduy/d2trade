import { all, takeLatest, put, select } from 'redux-saga/effects'
import axios from 'axios'
import _ from 'lodash'

import {
  fetchItemFail, fetchItemSuccess,
  postItemSuccess, postItemFail,
  fetchItemsSuccess, fetchItemsFail, fetchItemsStart,
  deleteItemsSuccess, deleteItemsFail,
  putItemSuccess, putItemFail
} from './item.actions'
import { toggleBackdrop } from '../backdrop/backdrop.actions'
import { enqSnackbar } from '../snackbar/snackbar.actions'

import { selectItems } from './item.selectors'

import { ItemTypes } from './item.types'

export function* fetchItemAsync({ itemName, ...action }) {
  try {
    const respone = yield axios(`/admin/items/market/${itemName}`)

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
      const respone = yield axios.post('/admin/items/new', item)

      if (respone.status === 200) {
        yield put(enqSnackbar({
          severity: 'success',
          key: new Date().getTime()
        }))
        yield put(postItemSuccess())
        yield put(fetchItemsStart())
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

    if (respone.status === 200)
      yield put(fetchItemsSuccess(respone.data))
    else yield put(fetchItemsFail(respone.statusText))
  } catch (err) {
    yield put(fetchItemsFail())
  }
}

export function* deleteItemsAsync({ items }) {
  yield put(toggleBackdrop())
  try {
    const respone = yield axios.post('/admin/items/delete', items)

    if (respone.status === 200) {
      yield put(deleteItemsSuccess())
      yield put(enqSnackbar({
        severity: 'success',
        text: 'Xóa item thành công!',
        key: new Date().getTime()
      }))
      yield put(fetchItemsStart())
    }
    else {
      yield put(deleteItemsFail(respone.statusText))
      yield put(enqSnackbar({
        severity: 'error',
        text: 'Xóa item thất bại!',
        key: new Date().getTime()
      }))
    }
  } catch (err) {
    yield put(deleteItemsFail(err.message))
    yield put(enqSnackbar({
      severity: 'error',
      text: 'Xóa item thất bại!',
      key: new Date().getTime()
    }))
  }
  yield put(toggleBackdrop())
}

export function* putItemAsync({ item }) {
  yield put(toggleBackdrop())
  try {
    const respone = yield axios.post('/admin/items/put', item)

    if (respone.status === 200) {
      yield put(putItemsSuccess())
      yield put(enqSnackbar({
        severity: 'success',
        text: 'Sửa item thành công!',
        key: new Date().getTime()
      }))
      yield put(fetchItemsStart())
    }
    else {
      yield put(putItemsFail(respone.statusText))
      yield put(enqSnackbar({
        severity: 'error',
        text: 'Sửa item thất bại!',
        key: new Date().getTime()
      }))
    }
  } catch (err) {
    yield put(putItemsFail(err.message))
    yield put(enqSnackbar({
      severity: 'error',
      text: 'Sửa item thất bại!',
      key: new Date().getTime()
    }))
  }
  yield put(toggleBackdrop())
}

export function* itemRootSaga() {
  yield all([
    takeLatest(ItemTypes.FETCH_ITEM_START, fetchItemAsync),
    takeLatest(ItemTypes.POST_ITEM_START, postItemAsync),
    takeLatest(ItemTypes.FETCH_ITEMS_START, fetchItemsAsync),
    takeLatest(ItemTypes.DELETE_ITEMS_START, deleteItemsAsync),
    takeLatest(ItemTypes.PUT_ITEMS_START, putItemAsync),
  ])
}