import { all, takeLatest, select, put } from 'redux-saga/effects'

import { popOverlayFinish, updateLastStackFinish } from './overlay.actions'
import { setBalance } from '../users/users.actions'

import { selectOverlayLastStack, selectOverlayStack } from './overlay.selectors'

import { OverlayTypes } from './overlay.types'

export function* overlayPopAsync({ decision, ...action }) {
  const lastStack = yield select(selectOverlayLastStack)
  const currentStack = yield select(selectOverlayStack)
  const newStack = [...currentStack]

  if (decision)
    switch (lastStack.exec_code) {
      case 'SET_BALANCE':
        yield put(setBalance(lastStack.data.user.steamid, lastStack.data.value, "SET"))
        yield newStack.pop();
        break;

      case 'CONFIRMATION_SET_BALANCE':
        yield newStack.push({ type: "CONFIRMATION", data: lastStack.data, exec_code: "SET_BALANCE" })
        break;

      default:
        break;
    }
  else yield newStack.pop();

  yield put(popOverlayFinish(newStack));
}

export function* updateLastStackAsync({ stack, decision, ...action }) {
  const currentStack = yield select(selectOverlayStack);
  const newStack = [...currentStack]
  const stackToPush = { ...stack }

  yield newStack.pop();
  yield newStack.push(stackToPush);

  yield put(updateLastStackFinish(newStack))
}

export function* overlayRootSaga() {
  yield all([
    takeLatest(OverlayTypes.OVERLAY_POP_START, overlayPopAsync),
    takeLatest(OverlayTypes.UPDATE_LAST_STACK_START, updateLastStackAsync)
  ])
}