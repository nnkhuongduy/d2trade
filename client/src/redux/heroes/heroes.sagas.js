import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import { fetchHeroesSuccess, fetchHeroesFail, setHeroesContainer } from './heroes.actions';


import { HeroesTypes } from './heroes.types'

export function* fetchHeroesAsync() {
  try {
    const heroesData = yield axios("/heroes");

    yield put(fetchHeroesSuccess(heroesData.data));
  } catch (err) {
    yield put(fetchHeroesFail(err.message));
  }
}

export function* filterHeroAsync() {
  yield put(setHeroesContainer(null))
}

export function* fetchHeroesStart() {
  yield takeLatest(HeroesTypes.FETCH_HEROES_START, fetchHeroesAsync)
}

export function* filterHeroStart() {
  yield takeLatest(HeroesTypes.FILTER_HEROES, filterHeroAsync)
}