import { all, takeLatest, put, select } from 'redux-saga/effects'

import { updateStashFinish } from './stash.actions'

import { selectBotStash, selectUserStash } from './stash.selectors'
import { selectCurrentUser } from '../user/user.selectors'
import { selectUserInventory } from '../inventory/inventory.selectors'

import { StashTypes } from './stash.types'

function* updateStashAsync({ inventoryType, actionType, item }) {
  const botStash = yield select(selectBotStash)
  const userStash = yield select(selectUserStash)
  const user = yield select(selectCurrentUser)
  const inventory = yield select(selectUserInventory)

  let stash = {
    bot: botStash,
    user: userStash
  }
  let newStash

  if (actionType === 'add')
    newStash = [...stash[inventoryType], item]
  else newStash = stash[inventoryType].filter(stashItem => stashItem.assetId !== item.assetId)

  stash[inventoryType] = newStash

  const diff = stash.bot.reduce(((accumulator, item) => accumulator += item.prices.vnd), 0)
    - stash.user.filter(item => item.assetId !== 'moneyItem')
      .reduce(((accumulator, item) => accumulator += item.prices.vnd), 0)

  if (inventory) {
    if (diff > 0 && diff < user.accountBalance) inventory[0].prices.vnd = diff
    if (diff >= user.accountBalance) inventory[0].prices.vnd = user.accountBalance
    if (diff <= 0) inventory[0].prices.vnd = 0
  }

  let moneyItem = inventoryType === 'user' ? newStash.find(item => item.assetId === 'moneyItem') : userStash.find(item => item.assetId === 'moneyItem')
  let index;

  if (moneyItem) {
    index = inventoryType === 'user' ? newStash.indexOf(moneyItem) : userStash.indexOf(moneyItem)
    if (diff > 0 && diff < user.accountBalance) moneyItem.prices.vnd = diff
    if (diff >= user.accountBalance) moneyItem.prices.vnd = user.accountBalance
    if (diff <= 0) moneyItem.prices.vnd = 0
  }

  if (inventoryType === 'user')
    yield put(updateStashFinish('user', newStash))
  else {
    let newUserStash = [...userStash]
    newUserStash[index] = moneyItem && moneyItem
    yield put(updateStashFinish('user', newUserStash))
    yield put(updateStashFinish(inventoryType, newStash))
  }
}

export function* stashRootSaga() {
  yield all([
    takeLatest(StashTypes.UPDATE_STASH_START, updateStashAsync)
  ])
}