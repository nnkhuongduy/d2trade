import { all, takeLatest, select, put } from 'redux-saga/effects'

import { popOverlayFinish } from './overlay.actions'
import { editBalanceStart } from '../users/users.actions'

import { selectOverlayLastStack } from './overlay.selectors'

import { OverlayTypes } from './overlay.types'

export function* overlayPopAsync({ decision, ...action }) {
  const lastStack = yield select(selectOverlayLastStack)

  if (decision)
    switch (lastStack.exec_code) {
      case 'EDIT_BALANCE':
        yield put(editBalanceStart(lastStack.data.steam_id, lastStack.data.value))
        break;

      default:
        break;
    }

  yield put(popOverlayFinish());
}

export function* overlayRootSaga() {
  yield all([
    takeLatest(OverlayTypes.OVERLAY_POP_START, overlayPopAsync)
  ])
}