import { all, takeLatest, put, select } from 'redux-saga/effects'
import axios from 'axios'

import { postUrlSuccess, postUrlFail, postOfferSuccess, postOfferFail } from './offer.actions'
import { setBackdrop } from '../backdrop/backdrop.actions'
import { enqSnackbar } from '../snackbar/snackbar.actions'
import { resetSite } from '../site/site.actions'

import { selectCurrentUser } from '../user/user.selectors'
import { selectBotStash, selectUserStash, selectUserBalance } from '../stash/stash.selectors'

import { OfferTypes } from './offer.types'

function* postUrlAsync({ url }) {
  try {
    const user = yield select(selectCurrentUser)
    const userId = user.steamid
    const postObj = {
      userId: userId,
      info: {
        tradeOfferUrl: url
      }
    }
    const respone = yield axios.post('/edituser', postObj)

    if (respone.status === 200) {
      yield put(postUrlSuccess())
      yield put(enqSnackbar({
        severity: 'success',
        text: 'Cập nhật Link Trade Offer thành công!',
        key: new Date().getTime()
      }))
      yield put(resetSite())
    } else {
      yield put(postUrlFail(respone.statusMessage))
      yield put(enqSnackbar({
        severity: 'error',
        text: 'Cập nhật Link Trade Offer thất bại!',
        key: new Date().getTime()
      }))
    }
  } catch (err) {
    yield put(postUrlFail(err.message))
    yield put(enqSnackbar({
      severity: 'error',
      text: 'Cập nhật Link Trade Offer thất bại!',
      key: new Date().getTime()
    }))
  }
}

function* postOfferAsync() {
  yield put(setBackdrop(true))

  try {
    const user = yield select(selectCurrentUser)
    const userStash = yield select(selectUserStash)
    const botStash = yield select(selectBotStash)
    const balance = yield select(selectUserBalance)

    const steamId = user.steamid
    const postObj = {
      steamId: steamId,
      bot: botStash,
      user: userStash.filter(item => item.assetId !== 'moneyItem'),
      balance: balance
    }

    const respone = yield axios.post('/tradeoffer', postObj)

    if (respone.status === 200) {
      yield put(postOfferSuccess())
      yield put(enqSnackbar({
        severity: 'success',
        text: 'Trade thành công! Steam Offer đã được gửi',
        key: new Date().getTime()
      }))
      yield put(resetSite())
    } else {
      yield put(postOfferFail(respone.statusMessage))
      yield put(enqSnackbar({
        severity: 'error',
        text: 'Trade thất bại!',
        key: new Date().getTime()
      }))
    }
  } catch (err) {
    yield put(postOfferFail(err.message))
    yield put(enqSnackbar({
      severity: 'error',
      text: 'Trade thất bại!',
      key: new Date().getTime()
    }))
  }

  yield put(setBackdrop(false))
}

export function* offerRootSaga() {
  yield all([
    takeLatest(OfferTypes.POST_URL_START, postUrlAsync),
    takeLatest(OfferTypes.POST_OFFER_START, postOfferAsync),
  ])
}