import { all, call } from 'redux-saga/effects';

import { inventoryRootSaga } from './inventory/inventory.sagas';
import { userRootSaga } from './user/user.sagas';
import { heroesRootSaga } from './heroes/heroes.sagas';
import { stashRootSaga } from './stash/stash.sagas';
import { offerRootSaga } from './offer/offer.sagas';
import { siteRootSaga } from './site/site.sagas'

export default function* rootSaga() {
  yield all([
    call(inventoryRootSaga),
    call(userRootSaga),
    call(heroesRootSaga),
    call(stashRootSaga),
    call(offerRootSaga),
    call(siteRootSaga)
  ]);
}