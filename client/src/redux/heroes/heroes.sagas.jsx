import { all, takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import { fetchHeroesSuccess, fetchHeroesFail } from './heroes.actions'

import { HeroesTypes } from './heroes.types'

function* fetchHeroesAsync() {
  try {
    const respone = yield axios('/heroes')

    if (respone.status === 200)
      yield put(fetchHeroesSuccess(respone.data))
    else yield put(fetchHeroesFail(respone.statusMessage))
  } catch (err) {
    yield put(fetchHeroesFail(err.message))
  }
}

export function* heroesRootSaga() {
  yield all([
    takeLatest(HeroesTypes.FETCH_HEROES_START, fetchHeroesAsync)
  ])
}