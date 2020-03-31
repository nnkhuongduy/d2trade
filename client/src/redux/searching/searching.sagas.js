import { takeEvery, takeLatest, select, put } from 'redux-saga/effects'
import _ from 'lodash';

import { SearchingTypes } from './searching.types'

import { selectBotSearchingQuery, selectUserSearchingQuery } from './searching.selectors'
import { selectBotInventory, selectUserInventory } from '../inventory/inventory.selectors'
import { selectFilteredType, selectFilteredItems, selectHeroesData } from '../heroes/heroes.selectors'

import { setQueryItems } from './searching.actions'
import {
  setRenderingInventoryStart,
  updateRenderedInventory,
} from '../inventory/inventory.actions'
import { setHeroesRendered } from '../heroes/heroes.actions'

export function* querySearchingAsync({ queryType, query, ...action }) {
  const inventory = yield queryType === "bot" ? select(selectBotInventory) : select(selectUserInventory);

  const queryArray = [];

  if (query !== "") {
    yield inventory.forEach(item => {
      if (_.lowerCase(item.item.market_hash_name).includes(_.lowerCase(query))) {
        queryArray.push(item.item.id);
      }
    })
  }

  yield put(setQueryItems(queryType, queryArray, query, query === "" ? false : true));
  yield put(updateRenderedInventory(queryType, []));
  yield put(setRenderingInventoryStart(queryType));
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

export function* querySearchingStart() {
  yield takeEvery(SearchingTypes.SET_QUERY_ITEMS_START, querySearchingAsync)
}

export function* heroSearchingStart() {
  yield takeLatest(SearchingTypes.HERO_SEARCHING_START, heroSearchingAsync)
}