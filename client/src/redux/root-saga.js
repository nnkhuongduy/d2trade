import { all, call } from 'redux-saga/effects';

import {
  fetchInventoryStarting,
  updateRenderedInventoryStarting,
  refreshInventoryStart,
  setRenderingInventoryStart,
  setBalanceItemStart
} from './inventory/inventory.sagas';
import { fetchOfferStatusStart } from './client-states/client-states.sagas';
import { querySearchingStart, heroSearchingStart } from './searching/searching.sagas'
import { fetchHeroesStart, filterHeroStart } from './heroes/heroes.sagas'
import { priceFilterStart } from './price-filter/price-filter.sagas'
import { fetchUserStart, logOutStart, editUserInfoStart } from './user/user.sagas'
import { tempItemSaga } from './temp-item/temp-item.sagas'

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
    call(fetchUserStart),
    call(logOutStart),
    call(editUserInfoStart),
    call(setBalanceItemStart),
    call(tempItemSaga)
  ]);
}