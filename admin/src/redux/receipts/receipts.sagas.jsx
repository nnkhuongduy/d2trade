import { takeLatest, all, put } from 'redux-saga/effects'
import axios from 'axios'

import { fetchReceiptsSuccess, fetchReceiptsFail } from './receipts.actions'

import { ReceiptsTypes } from './receipts.types'

function* fetchReceiptsAsync() {
  try {
    const respone = yield axios('/admin/receipts')

    if (respone.status === 200) {
      yield put(fetchReceiptsSuccess(respone.data))
    }
    else {
      yield put(fetchReceiptsFail(respone.statusMessage))
    }
  } catch (err) {
    yield put(fetchReceiptsFail(err.message))
  }
}

export function* receiptsRootSaga() {
  yield all([
    takeLatest(ReceiptsTypes.FETCH_RECEIPTS_START, fetchReceiptsAsync)
  ])
}