import { all, call } from 'redux-saga/effects';

import {
  fetchInventoryStarting,
  updateRenderedInventoryStarting,
  refreshInventoryStart,
} from './inventory/inventory.sagas';
import { fetchOfferStatusStart } from './client-states/client-states.sagas';
import { botQuerySearchingStart, userQuerySearchingStart, heroSearchingStart } from './searching/searching.sagas'
import { fetchHeroesStart, filterHeroStart } from './heroes/heroes.sagas'

export default function* rootSaga() {
  yield all([
    call(fetchInventoryStarting),
    call(fetchOfferStatusStart),
    call(botQuerySearchingStart),
    call(userQuerySearchingStart),
    call(heroSearchingStart),
    call(updateRenderedInventoryStarting),
    call(refreshInventoryStart),
    call(fetchHeroesStart),
    call(filterHeroStart),

  ]);
}