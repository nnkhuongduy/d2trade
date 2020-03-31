import { takeLatest, takeEvery, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { InventoryActionTypes } from './inventory.types';

import {
  fetchInventoryStart, fetchInventorySuccess, fetchInventoryFailure,
  updateRenderedInventory, updateRenderedInventoryStart,
  setRenderingInventory
} from './inventory.actions';
import { refreshQuery } from '../searching/searching.actions'

import { selectBotQueryIds, selectUserQueryIds, selectBotSearchingState, selectUserSearchingState } from '../searching/searching.selectors'
import { selectBotInventory, selectUserInventory, selectBotRenderedInventory, selectUserRenderedInventory, selectBotRenderingInventory, selectUserRenderingInventory } from './inventory.selectors'
import { selectFilteredType, selectFilteredItems } from '../heroes/heroes.selectors'

export function* fetchInventoryAsync({ type, inventoryType }) {
  try {
    const miniInventory = [];
    const result = yield inventoryType === "bot" ? axios('/inventory') : axios('/inventory2');

    const inventory = yield result.data.map(item => {
      return ({
        ...item,
        item: {
          ...item.item,
          market_price: (Math.random() * (40 - 0.01) + 0.01).toFixed(2)
        }
      })
    });

    yield inventory.forEach(item => miniInventory.push(item.item.id));

    yield put(fetchInventorySuccess(inventoryType, inventory));
    yield put(setRenderingInventory(inventoryType, miniInventory));
    yield put(updateRenderedInventoryStart(inventoryType));
  } catch (error) {
    yield put(fetchInventoryFailure(inventoryType, error.message));
  }
}

export function* updateRenderedInventoryAsync({ type, inventoryType }) {
  const renderingInventory = yield inventoryType === "bot" ? select(selectBotRenderingInventory) : select(selectUserRenderingInventory);
  const renderedInventory = yield inventoryType === "bot" ? select(selectBotRenderedInventory) : select(selectUserRenderedInventory);

  const updateArray = yield renderingInventory.slice(0, renderedInventory.length + InventoryActionTypes.RENDERED_INVENTORY_UPDATE_INTERVAL);

  yield put(updateRenderedInventory(inventoryType, updateArray));
}

export function* setRenderingInventoryAsync({ inventoryType, ...action }) {
  const isSearching = yield inventoryType === "bot" ? select(selectBotSearchingState) : select(selectUserSearchingState);

  const seachingInventory = yield inventoryType === "bot" ? select(selectBotQueryIds) : select(selectUserQueryIds);
  const inventory = yield inventoryType === "bot" ? select(selectBotInventory) : select(selectUserInventory);

  let renderInventory = [];
  if (isSearching) {
    renderInventory = seachingInventory
  } else {
    inventory.forEach(item => renderInventory.push(item.item.id));
  }

  yield put(setRenderingInventory(inventoryType, renderInventory));
  yield put(updateRenderedInventoryStart(inventoryType));
}

export function* refreshInventoryAsync({ inventoryType, ...action }) {
  yield put(refreshQuery(inventoryType));
  yield put(fetchInventoryStart(inventoryType))
}

export function* fetchInventoryStarting() {
  yield takeEvery(InventoryActionTypes.FETCH_INVENTORY_START, fetchInventoryAsync)
}

export function* updateRenderedInventoryStarting() {
  yield takeEvery(InventoryActionTypes.UPDATE_RENDERED_INVENTORY_START, updateRenderedInventoryAsync)
}

export function* setRenderingInventoryStart() {
  yield takeEvery(InventoryActionTypes.SET_RENDERING_INVENTORY_START, setRenderingInventoryAsync)
}

export function* refreshInventoryStart() {
  yield takeLatest(InventoryActionTypes.REFRESH_INVENTORY_START, refreshInventoryAsync)
}