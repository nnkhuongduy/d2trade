import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { InventoryActionTypes } from './inventory.types';
import { fetchBotInventorySuccess, fetchBotInventoryFailure, fetchUserInventorySuccess, fetchUserInventoryFailure, updateBotRenderedInventory, updateUserRenderedInventory } from './inventory.actions';

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
    yield put(updateBotRenderedInventory());
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
    yield put(updateUserRenderedInventory());
  } catch (error) {
    yield put(fetchUserInventoryFailure(error.message));
  }
}

export function* fetchBotInventoryStart() {
  yield takeLatest(InventoryActionTypes.FETCH_BOT_INVENTORY_START, fetchBotInventoryAsync)
}

export function* fetchUserInventoryStart() {
  yield takeLatest(InventoryActionTypes.FETCH_USER_INVENTORY_START, fetchUserInventoryAsync)
}