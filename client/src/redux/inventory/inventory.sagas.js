import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import { InventoryActionTypes } from './inventory.types';
import { fetchBotInventorySuccess, fetchBotInventoryFailure, fetchUserInventorySuccess, fetchUserInventoryFailure } from './inventory.actions';

export function* fetchBotInventoryAsync() {
  try {
    const botResult = yield axios('/inventory');

    const botInventory = yield botResult.data.map(item => ({
      ...item,
      item: {
        ...item.item,
        market_price: "2.25"
      }
    }));

    yield put(fetchBotInventorySuccess(botInventory));

  } catch (error) {
    yield put(fetchBotInventoryFailure(error.message));
  }
}

export function* fetchUserInventoryAsync() {
  try {
    const userResult = yield axios('/inventory2');

    const userInventory = yield userResult.data.map(item => ({
      ...item,
      item: {
        ...item.item,
        market_price: "2.00"
      }
    }));

    yield put(fetchUserInventorySuccess(userInventory));

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