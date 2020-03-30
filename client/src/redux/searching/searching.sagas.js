import { takeEvery, select, put } from 'redux-saga/effects'
import _ from 'lodash';

import { SearchingTypes } from './searching.types'

import { selectBotSearchingQuery, selectUserSearchingQuery } from './searching.selectors'
import { selectBotInventory, selectUserInventory } from '../inventory/inventory.selectors'
import { selectFilteredType, selectFilteredItems } from '../heroes/heroes.selectors'

import { setBotQueryItems, setUserQueryItems } from './searching.actions'
import {
  updateBotRenderedInventoryStart, updateUserRenderedInventoryStart,
  updateBotRenderedInventory, updateUserRenderedInventory
} from '../inventory/inventory.actions'

export function* botQuerySearchingAsync() {
  const query = yield select(selectBotSearchingQuery);
  const botInventory = yield select(selectBotInventory);
  const isFiltering = yield select(selectFilteredType);
  const filterInventory = yield select(selectFilteredItems)

  const queryArray = [];

  if (botInventory) {
    if (!isFiltering.bot) {
      yield put(updateBotRenderedInventory([]));

      yield botInventory.forEach(item => {
        if (_.lowerCase(item.item.market_hash_name).includes(_.lowerCase(query))) {
          queryArray.push(item.item.id);
        }
      })

      yield put(setBotQueryItems(queryArray));
      yield put(updateBotRenderedInventoryStart());
    } else {
      yield put(updateBotRenderedInventory([]));

      yield filterInventory.bot.forEach(id => {
        botInventory.forEach(botItem => {
          if (botItem.item.id === id && _.lowerCase(botItem.item.market_hash_name).includes(_.lowerCase(query)))
            queryArray.push(id)
        })
      })

      yield put(setBotQueryItems(queryArray));
      yield put(updateBotRenderedInventoryStart());
    }
  }
}

export function* userQuerySearchingAsync() {
  const query = yield select(selectUserSearchingQuery);
  const userInventory = yield select(selectUserInventory);
  const isFiltering = yield select(selectFilteredType);
  const filterInventory = yield select(selectFilteredItems)


  const queryArray = [];

  if (userInventory) {
    if (!isFiltering.user) {
      yield put(updateUserRenderedInventory([]));

      yield userInventory.forEach(item => {
        if (_.lowerCase(item.item.market_hash_name).includes(_.lowerCase(query))) {
          queryArray.push(item.item.id);
        }
      })

      yield put(setUserQueryItems(queryArray));
      yield put(updateUserRenderedInventoryStart());
    } else {
      yield put(updateUserRenderedInventory([]));

      yield filterInventory.user.forEach(id => {
        userInventory.forEach(userItem => {
          if (userItem.item.id === id && _.lowerCase(userItem.item.market_hash_name).includes(_.lowerCase(query)))
            queryArray.push(id)
        })
      })

      yield put(setUserQueryItems(queryArray));
      yield put(updateUserRenderedInventoryStart());
    }
  }

}

export function* botQuerySearchingStart() {
  yield takeEvery(SearchingTypes.SET_BOT_SEARCHING_QUERY, botQuerySearchingAsync)
}

export function* userQuerySearchingStart() {
  yield takeEvery(SearchingTypes.SET_USER_SEARCHING_QUERY, userQuerySearchingAsync)
}
