import { all, call } from 'redux-saga/effects';

import { usersRootSaga } from './users/users.sagas'
import { overlayRootSaga } from './overlay/overlay.sagas'
import { itemRootSaga } from './item/item.sagas'
import { siteSettingsRootSaga } from './site-settings/site-settings.sagas'
import { heroRootSaga } from './hero/hero.sagas'

export default function* rootSaga() {
  yield all([
    call(usersRootSaga),
    call(overlayRootSaga),
    call(itemRootSaga),
    call(siteSettingsRootSaga),
    call(heroRootSaga)
  ])
}