import { takeEvery, select, put } from 'redux-saga/effects'

import { SearchingTypes } from './searching.types'

import { selectBotSearchingQuery, selectUserSearchingQuery } from './searching.selectors'
import { selectBotInventory, selectUserInventory } from '../inventory/inventory.selectors'

import { setBotQueryItems, setUserQueryItems } from './searching.actions'
import {
  updateBotRenderedInventoryStart, updateUserRenderedInventoryStart,
  updateBotRenderedInventory, updateUserRenderedInventory
} from '../inventory/inventory.actions'

export function* botQuerySearchingAsync() {
  const query = yield select(selectBotSearchingQuery);
  const botInventory = yield select(selectBotInventory);

  const queryArray = [];

  yield put(updateBotRenderedInventory([]));

  yield botInventory.forEach(item => {
    if (item.item.market_hash_name.includes(query)) {
      queryArray.push(item.item.id);
    }
  })

  yield put(setBotQueryItems(queryArray));
  yield put(updateBotRenderedInventoryStart());
}

export function* userQuerySearchingAsync() {
  const query = yield select(selectUserSearchingQuery);
  const userInventory = yield select(selectUserInventory);

  const queryArray = [];

  yield put(updateUserRenderedInventory([]));

  yield userInventory.forEach(item => {
    if (item.item.market_hash_name.includes(query)) {
      queryArray.push(item.item.id);
    }
  })

  yield put(setUserQueryItems(queryArray));
  yield put(updateUserRenderedInventoryStart());
}

export function* botQuerySearchingStart() {
  yield takeEvery(SearchingTypes.SET_BOT_SEARCHING_QUERY, botQuerySearchingAsync)
}

export function* userQuerySearchingStart() {
  yield takeEvery(SearchingTypes.SET_USER_SEARCHING_QUERY, userQuerySearchingAsync)
}
