import { HeroesTypes } from './heroes.types'

export const fetchHeroesStart = () => ({
  type: HeroesTypes.FETCH_HEROES_START
})

export const fetchHeroesSuccess = heroes => ({
  type: HeroesTypes.FETCH_HEROES_SUCCESS,
  payload: heroes
})

export const fetchHeroesFail = message => ({
  type: HeroesTypes.FETCH_HEROES_FAIL,
  payload: message
})

export const setHeroesRendered = heroes => ({
  type: HeroesTypes.SET_HEROES_RENDERED,
  payload: heroes
})

export const setHeroesContainer = type => ({
  type: HeroesTypes.SET_HERO_CONTAINER,
  payload: type
})

export const filterHeroesStart = (filterType, heroName) => ({
  type: HeroesTypes.FILTER_HEROES_START,
  heroName: heroName,
  filterType: filterType
})

export const filterHeroesFinish = (filterType, filterHero, filterArray, filterState) => ({
  type: HeroesTypes.FILTER_HEROES_FINISH,
  filterType: filterType,
  filterHero: filterHero,
  filterState: filterState,
  filterArray: filterArray
})

export const resetHeroFilter = filterType => ({
  type: HeroesTypes.RESET_HERO_FILTER,
  filterType: filterType
})