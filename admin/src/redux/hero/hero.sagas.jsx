import { all, takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import { fetchHeroesSuccess, fetchHeroesFail } from './hero.actions'

import { HeroTypes } from './hero.types'

function* fetchHeroesAsync() {
  try {
    const respone = yield axios('/heroes')

    if (respone.status === 200)
      yield put(fetchHeroesSuccess(respone.data))
    else yield put(fetchHeroesFail(respone.statusText))
  } catch (err) {
    yield put(fetchHeroesFail(err.message))
  }
}

export function* heroRootSaga() {
  yield all([
    takeLatest(HeroTypes.FETCH_HEROES_START, fetchHeroesAsync)
  ])
}