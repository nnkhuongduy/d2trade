import { all, call } from 'redux-saga/effects';

import { fetchBotInventoryStart, fetchUserInventoryStart, updateBotRenderedInventoryStarting, updateUserRenderedInventoryStarting } from './inventory/inventory.sagas';
import { fetchOfferStatusStart } from './client-states/client-states.sagas';
import { botQuerySearchingStart, userQuerySearchingStart } from './searching/searching.sagas'

export default function* rootSaga() {
  yield all([
    call(fetchBotInventoryStart),
    call(fetchUserInventoryStart),
    call(fetchOfferStatusStart),
    call(botQuerySearchingStart),
    call(userQuerySearchingStart),
    call(updateBotRenderedInventoryStarting),
    call(updateUserRenderedInventoryStarting)
  ]);
}