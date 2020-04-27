import { all, call } from 'redux-saga/effects';

import { usersRootSaga } from './users/users.sagas'

export default function* rootSaga() {
  yield all([
    call(usersRootSaga)
  ])
}