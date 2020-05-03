import { HeroTypes } from './hero.types'

export const fetchHeroesStart = () => ({
  type: HeroTypes.FETCH_HEROES_START
})

export const fetchHeroesSuccess = heroes => ({
  type: HeroTypes.FETCH_HEROES_SUCCESS,
  heroes: heroes
})

export const fetchHeroesFail = message => ({
  type: HeroTypes.FETCH_HEROES_FAIL,
  message: message
})