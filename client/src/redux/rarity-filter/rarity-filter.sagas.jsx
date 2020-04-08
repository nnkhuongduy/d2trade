import { takeEvery, select, put } from 'redux-saga/effects'

import { RarityFilterTypes } from './rarity-filter.types'

import { filterFinish } from './rarity-filter.actions'
import { updateRenderedInventory, setRenderingInventoryStart } from '../inventory/inventory.actions'

import { selectBotInventory, selectUserInventory } from '../inventory/inventory.selectors'

export function* rarityFilterAsync({ filterType, rarityValue, ...action }) {
  const inventory = yield filterType === "bot" ? select(selectBotInventory) : select(selectUserInventory);

  const filterArray = [];
  let check = false;

  if (rarityValue !== null) {

    yield inventory.forEach(item => item.tags[1].name === rarityValue && item.id !== "moneyItem" && filterArray.push(item.id));

    check = true;
  }

  yield put(filterFinish(filterType, filterArray, check));
  yield put(updateRenderedInventory(filterType, []));
  yield put(setRenderingInventoryStart(filterType));

}

export function* rarityFilterStart() {
  yield takeEvery(RarityFilterTypes.RARITY_FILTER_START, rarityFilterAsync)
}