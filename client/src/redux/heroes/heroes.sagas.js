import { takeLatest, put, select } from 'redux-saga/effects'
import axios from 'axios'

import { fetchHeroesSuccess, fetchHeroesFail, setHeroesContainer, filterHeroesFinish } from './heroes.actions';

import { selectHeroesData, selectFilteredHero } from './heroes.selectors'

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
  let filterHero = null;

  yield put(setHeroesContainer(null));

  if (filteredHero[filterType] && filteredHero[filterType].localized_name === heroName) {
    yield put(filterHeroesFinish(null, filterType, false))
  } else {
    yield heroesData.forEach(hero => {
      if (hero.localized_name === heroName) filterHero = hero
    })

    yield put(filterHeroesFinish(filterHero, filterType, true))

  }

}

export function* fetchHeroesStart() {
  yield takeLatest(HeroesTypes.FETCH_HEROES_START, fetchHeroesAsync)
}

export function* filterHeroStart() {
  yield takeLatest(HeroesTypes.FILTER_HEROES_START, filterHeroAsync)
}