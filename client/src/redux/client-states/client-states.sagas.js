import { takeLatest, select, put } from 'redux-saga/effects';
import axios from 'axios';

import { ClientStatesTypes } from './client-states.types';

import { selectStateTempItem } from '../temp-item/temp-item.selectors';

import { toggleBlackScreen, fetchOfferStatusSuccess, fetchOfferStatusFailure } from '../../redux/client-states/client-states.actions';

export function* fetchOfferStatusAsync() {
  try {
    let itemObject = {
      user: [],
      bot: []
    }

    const tempItem = yield select(selectStateTempItem);

    tempItem.userTempItem.forEach(item => {
      itemObject.user.push(item.id);
    });
    tempItem.botTempItem.forEach(item => {
      itemObject.bot.push(item.id);
    })

    yield put(toggleBlackScreen());

    if (itemObject.user.length > 0 || itemObject.bot.length > 0) {
      const result = yield axios.post("/tradeoffer", itemObject)
      if (result) {
        yield put(fetchOfferStatusSuccess(true))
      } else {
        yield put(fetchOfferStatusSuccess(false))
      }
    }
  } catch (err) {
    yield put(fetchOfferStatusFailure(err.message));
  }
}

export function* fetchOfferStatusStart() {
  yield takeLatest(ClientStatesTypes.FETCH_OFFER_STATUS_START, fetchOfferStatusAsync)
}