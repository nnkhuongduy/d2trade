import { all, call } from 'redux-saga/effects';

import { usersRootSaga } from './users/users.sagas'
import { overlayRootSaga } from './overlay/overlay.sagas'
import { itemRootSaga } from './item/item.sagas'
import { siteConfigsRootSaga } from './site-configs/site-configs.sagas'
import { heroRootSaga } from './hero/hero.sagas'
import { offersRootSaga } from './offers/offers.sagas'
import { receiptsRootSaga } from './receipts/receipts.sagas'
import { adminRootSagas } from './admin/admin.sagas'

export default function* rootSaga() {
  yield all([
    call(usersRootSaga),
    call(overlayRootSaga),
    call(itemRootSaga),
    call(siteConfigsRootSaga),
    call(heroRootSaga),
    call(offersRootSaga),
    call(receiptsRootSaga),
    call(adminRootSagas)
  ])
}