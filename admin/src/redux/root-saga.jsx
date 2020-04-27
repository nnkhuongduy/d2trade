import { all, call } from 'redux-saga/effects';

import { usersRootSaga } from './users/users.sagas'
import { overlayRootSaga } from './overlay/overlay.sagas'

export default function* rootSaga() {
  yield all([
    call(usersRootSaga),
    call(overlayRootSaga)
  ])
}