import { all, call } from 'redux-saga/effects';

import { fetchBotInventoryStart, fetchUserInventoryStart } from './inventory/inventory.sagas';
import { fetchOfferStatusStart } from './client-states/client-states.sagas';

export default function* rootSaga() {
  yield all([call(fetchBotInventoryStart), call(fetchUserInventoryStart), call(fetchOfferStatusStart)]);
}