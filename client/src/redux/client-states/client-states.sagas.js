import { takeLatest, select, put } from 'redux-saga/effects';
import axios from 'axios';

import { ClientStatesTypes } from './client-states.types';

import { selectBotTempItem, selectUserTempItem } from '../temp-item/temp-item.selectors';
import { selectCurrentUser } from '../user/user.selectors'

import { toggleBlackScreen, fetchOfferStatusSuccess, fetchOfferStatusFailure } from '../../redux/client-states/client-states.actions';

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

    const itemObj = {};

    yield userTempItem.forEach(item => {
      itemObj = {
        id: item.id,
        market_price: item.market_price,
        vnd_price: item.vnd_price
      }

      postObject.user.push(itemObj);
    });
    yield botTempItem.forEach(item => {
      itemObj = {
        id: item.id,
        market_price: item.market_price,
        vnd_price: item.vnd_price
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

export function* fetchOfferStatusStart() {
  yield takeLatest(ClientStatesTypes.FETCH_OFFER_STATUS_START, fetchOfferStatusAsync)
}