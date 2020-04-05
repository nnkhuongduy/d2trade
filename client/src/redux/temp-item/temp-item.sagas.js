import { takeLatest, all, select, put } from 'redux-saga/effects'

import { setBalanceItemFinish } from '../inventory/inventory.actions'
import { updatePrice, unsetTempItem } from './temp-item.actions'
import { toggleSlotState } from '../slot-state/slot-state.actions'

import { selectBotTempItem, selectUserTempItem } from './temp-item.selectors'

import { TempItemTypes } from './temp-item.types'

export function* checkBalance({ tempType, item, type }) {
  const botItems = yield select(selectBotTempItem);
  const userItems = yield select(selectUserTempItem);

  const botTotalPrice = yield botItems.length !== 0 ? botItems.reduce((accumulator, item) => accumulator + parseFloat(item.market_price), 0) : 0;
  const userTotalPrice = yield userItems.length !== 0 ? userItems.filter(item => item.id !== "moneyItem").reduce((accumulator, item) => item.id !== "moneyItem" && accumulator + parseFloat(item.market_price), 0) : 0;

  let moneyItem = {};
  let flag = false;
  userItems.forEach(item => {
    if (item.id === "moneyItem") {
      moneyItem = item
      flag = true
    }
  })

  let diff = botTotalPrice - userTotalPrice;

  if (diff === 0 && diff !== botTotalPrice) diff = botTotalPrice;

  if (diff > 0) {
    yield put(updatePrice("bot", botTotalPrice.toFixed(2)))
    yield put(updatePrice("user", (flag === true ? userTotalPrice + diff : userTotalPrice).toFixed(2)))
  } else {
    yield put(updatePrice("bot", botTotalPrice.toFixed(2)))
    yield put(updatePrice("user", userTotalPrice.toFixed(2)))
  }

  // console.log(`botTotalPrice: ${botTotalPrice}`)
  // console.log(`userTotalPrice: ${userTotalPrice}`)
  // console.log(`diff: ${diff}`)

  yield put(setBalanceItemFinish(diff >= 0 ? diff.toFixed(2) : "0.00"))
}

export function* tempItemSaga() {
  yield all([
    takeLatest(TempItemTypes.SET_TEMP_ITEM, checkBalance),
    takeLatest(TempItemTypes.UNSET_TEMP_ITEM, checkBalance)
  ])
}