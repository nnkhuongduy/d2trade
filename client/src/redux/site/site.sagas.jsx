import { all, takeLatest, put } from 'redux-saga/effects'

import { fetchAllInventory } from '../inventory/inventory.actions'
import { resetAllStash } from '../stash/stash.actions'
import { logInStart } from '../user/user.actions'

import { SiteTypes } from './site.types'

function* resetAsync() {
  yield put(fetchAllInventory())
  yield put(resetAllStash())
  yield put(logInStart())
}

export function* siteRootSaga() {
  yield all([
    takeLatest(SiteTypes.RESET, resetAsync)
  ])
}