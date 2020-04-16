import { all, call } from 'redux-saga/effects';

import {
  fetchInventoryStarting,
  updateRenderedInventoryStarting,
  refreshInventoryStart,
  setRenderingInventoryStart,
} from './inventory/inventory.sagas';
import { fetchOfferStatusStart } from './client-states/client-states.sagas';
import { querySearchingStart, heroSearchingStart } from './searching/searching.sagas'
import { fetchHeroesStart, filterHeroStart } from './heroes/heroes.sagas'
import { priceFilterStart } from './price-filter/price-filter.sagas'
import { userRootSaga } from './user/user.sagas'
import { tempItemSaga } from './temp-item/temp-item.sagas'
import { fetchCurrencyRateStart } from './currency/currency.sagas'
import { rarityFilterStart } from './rarity-filter/rarity-filter.sagas'

export default function* rootSaga() {
  yield all([
    call(fetchInventoryStarting),
    call(fetchOfferStatusStart),
    call(querySearchingStart),
    call(heroSearchingStart),
    call(updateRenderedInventoryStarting),
    call(refreshInventoryStart),
    call(fetchHeroesStart),
    call(filterHeroStart),
    call(setRenderingInventoryStart),
    call(priceFilterStart),
    call(tempItemSaga),
    call(fetchCurrencyRateStart),
    call(rarityFilterStart),
    call(userRootSaga)
  ]);
}