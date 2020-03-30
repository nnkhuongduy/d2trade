import { takeLatest, put, select, all } from 'redux-saga/effects'
import axios from 'axios'

import { fetchHeroesSuccess, fetchHeroesFail, setHeroesContainer, filterHeroesFinish } from './heroes.actions';
import { updateRenderedInventory, updateRenderedInventoryStart } from '../inventory/inventory.actions'

import { selectHeroesData, selectFilteredHero } from './heroes.selectors'
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

export function* filterHeroAsync({ type, heroName, filterType }) {
  const heroesData = yield select(selectHeroesData);
  const filteredHero = yield select(selectFilteredHero);
  const botInventory = yield select(selectBotInventory);
  const userInventory = yield select(selectUserInventory);

  let filterHero = null;
  let filterTypeArray = [];
  let filteredInventory = {
    bot: [],
    user: []
  }
  let inventory = {
    bot: botInventory,
    user: userInventory
  }


  if (filterType === "global")
    yield filterTypeArray = ["bot", "user"];
  else yield filterTypeArray.push(filterType)

  if (filteredHero[filterTypeArray[0]] && filteredHero[filterTypeArray[0]].localized_name === heroName) {
    yield all(filterTypeArray.map(type => put(filterHeroesFinish(null, type, false, []))))

  } else {
    yield heroesData.forEach(hero => {
      if (hero.localized_name === heroName) filterHero = hero
    })

    yield all(filterTypeArray.map(type => {
      inventory[type].forEach(item => {
        if (item.item.tags[4].name === heroName) filteredInventory[type].push(item.item.id)
      })
    }))

    yield all(filterTypeArray.map(type => put(filterHeroesFinish(filterHero, type, true, filteredInventory[type]))))

  }

  yield all(filterTypeArray.map(type => {
    return type === "bot" ? put(updateRenderedInventory("bot", [])) : put(updateRenderedInventory("user", []))
  }))

  yield all(filterTypeArray.map(type => {
    return type === "bot" ? put(updateRenderedInventoryStart("bot")) : put(updateRenderedInventoryStart("user"))
  }))

  yield put(setHeroesContainer(null));

}

export function* fetchHeroesStart() {
  yield takeLatest(HeroesTypes.FETCH_HEROES_START, fetchHeroesAsync)
}

export function* filterHeroStart() {
  yield takeLatest(HeroesTypes.FILTER_HEROES_START, filterHeroAsync)
}