import { takeEvery, select, put } from 'redux-saga/effects'

import { PriceFilterTypes } from './price-filter.types'

import { filterFinish } from './price-filter.actions'
import { updateRenderedInventory, setRenderingInventoryStart } from '../inventory/inventory.actions'

import { selectBotInventory, selectUserInventory } from '../inventory/inventory.selectors'

export function* priceFilterAsync({ filterType, minValue, maxValue, ...action }) {
  const inventory = yield filterType === "bot" ? select(selectBotInventory) : select(selectUserInventory);
  const check = parseFloat(minValue) === 0 && parseFloat(maxValue) === 0

  const filterArray = [];

  if (!check) {
    if (parseFloat(maxValue) === 0) maxValue = 999999;
    yield inventory.forEach(item => {
      if (parseFloat(item.item.market_price) >= minValue && parseFloat(item.item.market_price) <= maxValue)
        filterArray.push(item.item.id);
    })
  }

  yield put(filterFinish(filterType, filterArray, !check));
  yield put(updateRenderedInventory(filterType, []));
  yield put(setRenderingInventoryStart(filterType));

}

export function* priceFilterStart() {
  yield takeEvery(PriceFilterTypes.PRICE_FILTER_START, priceFilterAsync)
}