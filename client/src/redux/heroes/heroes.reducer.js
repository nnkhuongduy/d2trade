import { HeroesTypes } from './heroes.types'

const INITIAL_STATE = {
  heroes: [],
  heroesRendered: [],
  isFetching: false,
  errorMessage: null,
  container: null,
  bot: {
    isHeroFiltering: false,
    filteredHero: null,
    filteredItemIds: []
  },
  user: {
    isHeroFiltering: false,
    filteredHero: null,
    filteredItemIds: []
  }
}

export const heroesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HeroesTypes.FETCH_HEROES_START:
      return {
        ...state,
        isFetching: true,
      }

    case HeroesTypes.FETCH_HEROES_SUCCESS:
      return {
        ...state,
        heroes: action.payload,
        heroesRendered: action.payload,
        isFetching: false,
      }

    case HeroesTypes.FETCH_HEROES_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }

    case HeroesTypes.SET_HEROES_RENDERED:
      return {
        ...state,
        heroesRendered: action.payload
      }

    case HeroesTypes.SET_HERO_CONTAINER:
      return {
        ...state,
        heroesRendered: state.heroes,
        container: action.payload
      }

    case HeroesTypes.FILTER_HEROES_FINISH:
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          isHeroFiltering: action.filterState,
          filteredHero: action.filterHero,
          filteredItemIds: action.filterArray
        }
      }

    default:
      return state
  }
}

export default heroesReducer