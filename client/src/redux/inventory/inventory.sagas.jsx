import { takeLatest, put, select, all } from 'redux-saga/effects';
import axios from 'axios';

import { InventoryActionTypes } from './inventory.types.jsx';

import {
  fetchInventorySuccess, fetchInventoryFailure,
} from './inventory.actions';

import { selectCurrentUser } from '../user/user.selectors'
import { selectDiff } from '../stash/stash.selectors'

function* fetchInventoryAsync({ inventoryType }) {
  try {
    const currentUser = yield select(selectCurrentUser);

    const userSteamId = currentUser && currentUser.steamid;
    const result = yield inventoryType === "bot" ? axios('/inventory/bot') : (userSteamId && axios(`/inventory/${userSteamId}`));

    if (result.status === 200) {
      const inventory = yield result.data;

      if (inventoryType === 'user') {
        const diff = yield select(selectDiff)

        if (diff > 0) {
          if (diff < currentUser.accountBalance) inventory[0].prices.vnd = diff
          if (diff >= currentUser.accountBalance) inventory[0].prices.vnd = currentUser.accountBalance
        }
      }

      yield put(fetchInventorySuccess(inventoryType, inventory));
    } else {
      yield put(fetchInventoryFailure(inventoryType, result.statusMessage));
    }
  } catch (error) {
    yield put(fetchInventoryFailure(inventoryType, error.message));
  }
}

export function* inventoryRootSaga() {
  yield all([
    takeLatest(InventoryActionTypes.FETCH_INVENTORY_START, fetchInventoryAsync)
  ])
}
