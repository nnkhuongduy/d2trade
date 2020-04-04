import { takeLatest, put, select } from 'redux-saga/effects'
import axios from 'axios'

import { fetchHeroesSuccess, fetchHeroesFail, setHeroesContainer, filterHeroesFinish } from './heroes.actions';
import { updateRenderedInventory, setRenderingInventoryStart } from '../inventory/inventory.actions'
import { setItemsImage } from '../items-image/items-image.actions'

import { selectHeroesData, selectBotFilteredHero, selectUserFilteredHero } from './heroes.selectors'
import { selectBotInventory, selectUserInventory } from '../inventory/inventory.selectors'
import { selectHeroesImage } from '../items-image/items-image.selectors'

import { HeroesTypes } from './heroes.types'

export function* fetchHeroesAsync() {
  try {
    const heroesData = yield axios("/heroes");
    const heroesImage = yield select(selectHeroesImage)

    const imageObj = {};

    heroesData.data.forEach(hero => {
      if (!heroesImage || !heroesImage[hero.localized_name]) {
        const heroImg = new Image()

        heroImg.src = hero.portrait_url;
        heroImg.alt = "hero_image";

        imageObj[hero.localized_name] = heroImg;
      }
    })

    yield put(setItemsImage("hero", imageObj));
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

    yield inventory.forEach(item => item.id !== 'moneyItem' && (item.tags[4].name === heroName && filteredInventory.push(item.id)))

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