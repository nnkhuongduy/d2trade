import { takeLatest, all, select, put } from 'redux-saga/effects'

import { setBalanceItem } from '../inventory/inventory.actions'
import { updatePrice } from './temp-item.actions'

import { selectBotTempItem, selectUserTempItem } from './temp-item.selectors'
import { selectUserInventory } from '../inventory/inventory.selectors'
import { selectCurrentUser } from '../user/user.selectors'
import { selectCurrencyRate } from '../currency/currency.selectors'

import { TempItemTypes } from './temp-item.types'

export function* checkBalance({ item, ...action }) {
  const userInventory = yield select(selectUserInventory)
  const currentUser = yield select(selectCurrentUser);
  const currentUserBalance = parseInt(currentUser.accountBalance);
  const currencyRate = yield select(selectCurrencyRate)

  const botItems = yield select(selectBotTempItem);
  const userItems = yield select(selectUserTempItem);

  const botTotalPriceUSD = yield botItems.length !== 0 ? botItems.reduce((accumulator, item) => accumulator + parseFloat(item.market_price), 0) : 0;
  const userTotalPriceWithoutMoneyUSD = yield userItems.length !== 0 ? userItems.filter(item => item.id !== "moneyItem").reduce((accumulator, item) =>
    item.id !== "moneyItem" && accumulator + parseFloat(item.market_price), 0) : 0;

  const botTotalPriceVND = yield botItems.length !== 0 ? botItems.reduce((accumulator, item) => accumulator + parseInt(item.vnd_price.replace(/,/g, '')), 0) : 0;
  const userTotalPriceWithoutMoneyVND = yield userItems.length !== 0 ? userItems.filter(item => item.id !== "moneyItem").reduce((accumulator, item) =>
    item.id !== "moneyItem" && accumulator + parseInt(item.vnd_price.replace(/,/g, '')), 0) : 0;

  // console.log(`botTotalPriceVND: ${parseInt(item.vnd_price)}`)
  // console.log(`botTotalPriceVND: ${item.vnd_price}`)
  // console.log(`userTotalPriceWithoutMoneyVND: ${userTotalPriceWithoutMoneyVND}`)


  let flag = false;
  userItems.forEach(item => {
    if (item.id === "moneyItem") {
      flag = true
    }
  })

  let diffUSD = botTotalPriceUSD - userTotalPriceWithoutMoneyUSD;
  let diffVND = botTotalPriceVND - userTotalPriceWithoutMoneyVND;

  if (diffVND > currentUserBalance) {
    diffVND = currentUserBalance;
    diffUSD = parseFloat((currentUserBalance / (currencyRate * 1000)).toFixed(2) - 0.01)
  }

  const userTotalPriceUSD = flag === true && diffUSD > 0 ? userTotalPriceWithoutMoneyUSD + diffUSD : userTotalPriceWithoutMoneyUSD;
  const userTotalPriceVND = flag === true && diffVND > 0 ? userTotalPriceWithoutMoneyVND + diffVND : userTotalPriceWithoutMoneyVND;

  if (diffUSD === 0 && diffUSD !== botTotalPriceUSD) diffUSD = botTotalPriceUSD;
  if (diffVND === 0 && diffVND !== botTotalPriceVND) diffVND = botTotalPriceVND;

  yield put(updatePrice("bot", botTotalPriceVND.toLocaleString(), botTotalPriceUSD.toFixed(2)))
  yield put(updatePrice("user", userTotalPriceVND.toLocaleString(), userTotalPriceUSD.toFixed(2)))

  if (userInventory !== null)
    yield put(setBalanceItem(diffVND >= 0 ? diffVND.toLocaleString() : 0, diffUSD >= 0 ? diffUSD.toFixed(2) : 0))
}

export function* tempItemSaga() {
  yield all([
    takeLatest(TempItemTypes.SET_TEMP_ITEM, checkBalance),
    takeLatest(TempItemTypes.UNSET_TEMP_ITEM, checkBalance)
  ])
}