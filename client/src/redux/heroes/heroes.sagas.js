import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import { fetchHeroesSuccess, fetchHeroesFail } from './heroes.actions';


import { HeroesTypes } from './heroes.types'

export function* fetchHeroesAsync() {
  try {
    const heroesData = yield axios("/heroes");

    yield put(fetchHeroesSuccess(heroesData.data));
  } catch (err) {
    yield put(fetchHeroesFail(err.message));
  }
}

export function* fetchHeroesStart() {
  yield takeLatest(HeroesTypes.FETCH_HEROES_START, fetchHeroesAsync)
}