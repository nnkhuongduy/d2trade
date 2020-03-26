import { takeLatest, takeEvery, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { InventoryActionTypes } from './inventory.types';

import {
  fetchBotInventorySuccess, fetchBotInventoryFailure,
  fetchUserInventorySuccess, fetchUserInventoryFailure,
  updateBotRenderedInventoryStart, updateUserRenderedInventoryStart,
  updateBotRenderedInventory, updateUserRenderedInventory,
  fetchBotInventoryStart as fetchBotStart, fetchUserInventoryStart as fetchUserStart
} from './inventory.actions';
import { refreshBotQuery, refreshtUserQuery } from '../searching/searching.actions'

import { selectBotSearchingState, selectUserSearchingState, selectBotQueryIds, selectUserQueryIds } from '../searching/searching.selectors'

import { selectBotInventory, selectUserInventory, selectBotRenderedInventory, selectUserRenderedInventory } from './inventory.selectors'

export function* fetchBotInventoryAsync() {
  try {
    const botResult = yield axios('/inventory');

    const botInventory = yield botResult.data.map(item => {
      let randomPrice = (Math.random() * (40 - 0.01) + 0.01).toFixed(2);
      return ({
        ...item,
        item: {
          ...item.item,
          market_price: randomPrice
        }
      })
    });

    yield put(fetchBotInventorySuccess(botInventory));
    yield put(updateBotRenderedInventoryStart());
  } catch (error) {
    yield put(fetchBotInventoryFailure(error.message));
  }
}

export function* fetchUserInventoryAsync() {
  try {
    const userResult = yield axios('/inventory2');

    const userInventory = yield userResult.data.map(item => {
      let randomPrice = (Math.random() * (40 - 0.01) + 0.01).toFixed(2);
      return ({
        ...item,
        item: {
          ...item.item,
          market_price: randomPrice
        }
      })
    });

    yield put(fetchUserInventorySuccess(userInventory));
    yield put(updateUserRenderedInventoryStart());
  } catch (error) {
    yield put(fetchUserInventoryFailure(error.message));
  }
}

export function* updateBotRenderedInventoryAsync() {
  const searchingState = yield select(selectBotSearchingState);
  const renderedIds = yield select(selectBotRenderedInventory);
  let updateArray = [];

  if (searchingState) {
    const inventory = yield select(selectBotQueryIds)
    yield updateArray = inventory.slice(0, renderedIds.length + InventoryActionTypes.RENDERED_INVENTORY_UPDATE_INTERVAL);
  } else {
    const inventory = yield select(selectBotInventory)
    yield inventory.slice(0, renderedIds.length + InventoryActionTypes.RENDERED_INVENTORY_UPDATE_INTERVAL).forEach(item => updateArray.push(item.item.id));
  }

  yield put(updateBotRenderedInventory(updateArray));
}

export function* updateUserRenderedInventoryAsync() {
  const searchingState = yield select(selectUserSearchingState);
  const renderedIds = yield select(selectUserRenderedInventory);
  let updateArray = [];

  if (searchingState) {
    const inventory = yield select(selectUserQueryIds)
    yield updateArray = inventory.slice(0, renderedIds.length + InventoryActionTypes.RENDERED_INVENTORY_UPDATE_INTERVAL);
  } else {
    const inventory = yield select(selectUserInventory)
    yield inventory.slice(0, renderedIds.length + InventoryActionTypes.RENDERED_INVENTORY_UPDATE_INTERVAL).forEach(item => updateArray.push(item.item.id));
  }

  yield put(updateUserRenderedInventory(updateArray));
}

export function* refreshBotInventoryAsync() {
  yield put(refreshBotQuery())
  yield put(fetchBotStart())
}

export function* refreshUserInventoryAsync() {
  yield put(refreshtUserQuery())
  yield put(fetchUserStart())
}

export function* fetchBotInventoryStart() {
  yield takeLatest(InventoryActionTypes.FETCH_BOT_INVENTORY_START, fetchBotInventoryAsync)
}

export function* fetchUserInventoryStart() {
  yield takeLatest(InventoryActionTypes.FETCH_USER_INVENTORY_START, fetchUserInventoryAsync)
}

export function* updateBotRenderedInventoryStarting() {
  yield takeEvery(InventoryActionTypes.UPDATE_BOT_RENDERED_INVENTORY_START, updateBotRenderedInventoryAsync)
}

export function* updateUserRenderedInventoryStarting() {
  yield takeEvery(InventoryActionTypes.UPDATE_USER_RENDERED_INVENTORY_START, updateUserRenderedInventoryAsync)
}

export function* refreshBotInventoryStart() {
  yield takeLatest(InventoryActionTypes.REFRESH_BOT_INVENTORY_START, refreshBotInventoryAsync)
}

export function* refreshUserInventoryStart() {
  yield takeLatest(InventoryActionTypes.REFRESH_USER_INVENTORY_START, refreshUserInventoryAsync)
}