import { takeLatest, select, put, all } from 'redux-saga/effects';
import axios from 'axios';

import { ClientStatesTypes } from './client-states.types';

import { selectBotTempItem, selectUserTempItem } from '../temp-item/temp-item.selectors';
import { selectCurrentUser } from '../user/user.selectors'

import { toggleBlackScreen, fetchOfferStatusSuccess, fetchOfferStatusFailure, resetOfferStatus } from '../client-states/client-states.actions';
import { refreshInventory, fetchInventoryStart } from '../inventory/inventory.actions'
import { refreshSlotsState } from '../slot-state/slot-state.actions'
import { refreshTempItems, updatePrice } from '../temp-item/temp-item.actions'
import { logInStart } from '../user/user.actions'

export function* fetchOfferStatusAsync() {
  try {
    const botTempItem = yield select(selectBotTempItem);
    const userTempItem = yield select(selectUserTempItem);
    const currentUser = yield select(selectCurrentUser);

    let postObject = {
      userData: currentUser,
      user: [],
      bot: []
    }

    let itemObj = {};

    yield userTempItem.forEach(item => {
      itemObj = {
        id: item.id,
        icon_url: item.icon_url,
        market_price: item.market_price,
        vnd_price: item.vnd_price
      }

      postObject.user.push(itemObj);
    });
    yield botTempItem.forEach(item => {
      itemObj = {
        id: item.id,
        icon_url: item.icon_url,
        market_price: item.market_price,
        vnd_price: item.vnd_price,
      }

      postObject.bot.push(itemObj);
    })

    yield put(toggleBlackScreen());

    if (postObject.user.length > 0 || postObject.bot.length > 0) {
      const result = yield axios.post("/tradeoffer", postObject)
      if (result) {
        yield put(fetchOfferStatusSuccess(true))
      } else {
        yield put(fetchOfferStatusSuccess(false))
      }
    }
  } catch (err) {
    yield put(fetchOfferStatusFailure(err.message));
    yield put(fetchOfferStatusSuccess(false));
  }
}

export function* resetClientStateAsync() {
  yield put(resetOfferStatus());
  yield put(refreshInventory("bot"));
  yield put(refreshInventory("user"));
  yield put(refreshSlotsState('bot'))
  yield put(refreshSlotsState('user'))
  yield put(refreshTempItems('bot'))
  yield put(refreshTempItems('user'))
  yield put(updatePrice('bot', '0', '0'))
  yield put(updatePrice('user', '0', '0'))
  yield put(fetchInventoryStart("bot"))
  yield put(logInStart());
}

export function* clientStateRootSaga() {
  yield all([
    takeLatest(ClientStatesTypes.FETCH_OFFER_STATUS_START, fetchOfferStatusAsync),
    takeLatest(ClientStatesTypes.RESET_CLIENT_STATE, resetClientStateAsync),
  ])
}