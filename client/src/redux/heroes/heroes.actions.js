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

export const setHeroesContainer = type => ({
  type: HeroesTypes.SET_HERO_CONTAINER,
  payload: type
})

export const filterHeroes = heroName => ({
  type: HeroesTypes.FILTER_HEROES,
  payload: heroName
})