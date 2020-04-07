import { takeEvery, select, put } from 'redux-saga/effects'

import { PriceFilterTypes } from './price-filter.types'

import { filterFinish } from './price-filter.actions'
import { updateRenderedInventory, setRenderingInventoryStart } from '../inventory/inventory.actions'

import { selectBotInventory, selectUserInventory } from '../inventory/inventory.selectors'
import { selectCurrencyState } from '../currency/currency.selectors'

export function* priceFilterAsync({ filterType, minValue, maxValue, ...action }) {
  const currencyState = yield select(selectCurrencyState)
  const inventory = yield filterType === "bot" ? select(selectBotInventory) : select(selectUserInventory);
  const check = (parseFloat(minValue) === 0 && parseFloat(maxValue) === 0) || (minValue === "" && maxValue === "")

  const filterArray = [];

  if (!check) {
    if (parseFloat(maxValue) === 0 || maxValue === "") maxValue = 9999999;
    yield inventory.forEach(item => {
      const itemPrice = currencyState === "vnd" ? parseInt(item.vnd_price.replace(/,/g, '')) : parseFloat(item.market_price)
      if (itemPrice >= minValue && itemPrice <= maxValue)
        filterArray.push(item.id);
    })
  }

  yield put(filterFinish(filterType, filterArray, !check));
  yield put(updateRenderedInventory(filterType, []));
  yield put(setRenderingInventoryStart(filterType));

}

export function* priceFilterStart() {
  yield takeEvery(PriceFilterTypes.PRICE_FILTER_START, priceFilterAsync)
}