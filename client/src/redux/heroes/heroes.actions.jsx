import { HeroesTypes } from './heroes.types'

export const fetchHeroesStart = () => ({
  type: HeroesTypes.FETCH_HEROES_START
})

export const fetchHeroesSuccess = heroes => ({
  type: HeroesTypes.FETCH_HEROES_SUCCESS,
  heroes: heroes
})

export const fetchHeroesFail = message => ({
  type: HeroesTypes.FETCH_HEROES_FAIL,
  message: message
})