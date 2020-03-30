import { takeEvery, takeLatest, select, put } from 'redux-saga/effects'
import _ from 'lodash';

import { SearchingTypes } from './searching.types'

import { selectBotSearchingQuery, selectUserSearchingQuery } from './searching.selectors'
import { selectBotInventory, selectUserInventory } from '../inventory/inventory.selectors'
import { selectFilteredType, selectFilteredItems, selectHeroesData } from '../heroes/heroes.selectors'

import { setBotQueryItems, setUserQueryItems } from './searching.actions'
import {
  updateRenderedInventoryStart,
  updateRenderedInventory,
} from '../inventory/inventory.actions'
import { setHeroesRendered } from '../heroes/heroes.actions'

export function* botQuerySearchingAsync() {
  const query = yield select(selectBotSearchingQuery);
  const botInventory = yield select(selectBotInventory);
  const isFiltering = yield select(selectFilteredType);
  const filterInventory = yield select(selectFilteredItems)

  const queryArray = [];

  if (botInventory) {
    if (!isFiltering.bot) {
      yield put(updateRenderedInventory("bot", []));

      yield botInventory.forEach(item => {
        if (_.lowerCase(item.item.market_hash_name).includes(_.lowerCase(query))) {
          queryArray.push(item.item.id);
        }
      })

      yield put(setBotQueryItems(queryArray));
      yield put(updateRenderedInventoryStart("bot"));
    } else {
      yield put(updateRenderedInventory("bot", []));

      yield filterInventory.bot.forEach(id => {
        botInventory.forEach(botItem => {
          if (botItem.item.id === id && _.lowerCase(botItem.item.market_hash_name).includes(_.lowerCase(query)))
            queryArray.push(id)
        })
      })

      yield put(setBotQueryItems(queryArray));
      yield put(updateRenderedInventoryStart("bot"));
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
      yield put(updateRenderedInventory("user", []));

      yield userInventory.forEach(item => {
        if (_.lowerCase(item.item.market_hash_name).includes(_.lowerCase(query))) {
          queryArray.push(item.item.id);
        }
      })

      yield put(setUserQueryItems(queryArray));
      yield put(updateRenderedInventoryStart("user"));
    } else {
      yield put(updateRenderedInventory("user", []));

      yield filterInventory.user.forEach(id => {
        userInventory.forEach(userItem => {
          if (userItem.item.id === id && _.lowerCase(userItem.item.market_hash_name).includes(_.lowerCase(query)))
            queryArray.push(id)
        })
      })

      yield put(setUserQueryItems(queryArray));
      yield put(updateRenderedInventoryStart("user"));
    }
  }

}

export function* heroSearchingAsync(action) {
  const heroesData = yield select(selectHeroesData);
  const heroesRender = [];

  yield heroesData.forEach(hero => {
    if (_.lowerCase(hero.localized_name).includes(_.lowerCase(action.payload)))
      heroesRender.push(hero);
  })

  yield put(setHeroesRendered(heroesRender));
}

export function* botQuerySearchingStart() {
  yield takeEvery(SearchingTypes.SET_BOT_SEARCHING_QUERY, botQuerySearchingAsync)
}

export function* userQuerySearchingStart() {
  yield takeEvery(SearchingTypes.SET_USER_SEARCHING_QUERY, userQuerySearchingAsync)
}

export function* heroSearchingStart() {
  yield takeLatest(SearchingTypes.HERO_SEARCHING_START, heroSearchingAsync)
}