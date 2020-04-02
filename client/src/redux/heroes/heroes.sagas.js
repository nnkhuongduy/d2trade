import { takeLatest, put, select, all } from 'redux-saga/effects'
import axios from 'axios'

import { fetchHeroesSuccess, fetchHeroesFail, setHeroesContainer, filterHeroesFinish } from './heroes.actions';
import { updateRenderedInventory, setRenderingInventoryStart } from '../inventory/inventory.actions'

import { selectHeroesData, selectBotFilteredHero, selectUserFilteredHero } from './heroes.selectors'
import { selectBotInventory, selectUserInventory } from '../inventory/inventory.selectors'

import { HeroesTypes } from './heroes.types'

export function* fetchHeroesAsync() {
  try {
    const heroesData = yield axios("/heroes");

    yield put(fetchHeroesSuccess(heroesData.data));
  } catch (err) {
    yield put(fetchHeroesFail(err.message));
  }
}

export function* filterHeroAsync({ filterType, heroName, ...action }) {
  const heroesData = yield select(selectHeroesData);
  const filteredHero = yield filterType === "bot" ? select(selectBotFilteredHero) : select(selectUserFilteredHero);
  const inventory = yield filterType === "bot" ? select(selectBotInventory) : select(selectUserInventory);

  let filteredInventory = [];

  if (filteredHero && filteredHero.localized_name === heroName) {
    yield put(filterHeroesFinish(filterType, null, [], false))
  } else {

    const filterHero = yield heroesData.filter(hero => hero.localized_name === heroName)[0];

    yield inventory.forEach(item => item.tags[4].name === heroName && filteredInventory.push(item.id))

    yield put(filterHeroesFinish(filterType, filterHero, filteredInventory, true))
  }

  yield put(setHeroesContainer(null));
  yield put(updateRenderedInventory(filterType, []));
  yield put(setRenderingInventoryStart(filterType));
}

export function* fetchHeroesStart() {
  yield takeLatest(HeroesTypes.FETCH_HEROES_START, fetchHeroesAsync)
}

export function* filterHeroStart() {
  yield takeLatest(HeroesTypes.FILTER_HEROES_START, filterHeroAsync)
}