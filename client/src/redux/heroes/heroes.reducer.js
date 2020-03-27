import { HeroesTypes } from './heroes.types'

const INITIAL_STATE = {
  heroes: [],
  isFetching: false,
  errorMessage: null,
  container: null,
  isFiltering: {
    bot: false,
    user: false,
  },
  filteredHero: {
    bot: null,
    user: null
  },
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
        isFetching: false,
      }

    case HeroesTypes.FETCH_HEROES_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      }

    case HeroesTypes.SET_HERO_CONTAINER:
      return {
        ...state,
        container: action.payload
      }

    case HeroesTypes.FILTER_HEROES_START:
      return {
        ...state,
        isFiltering: {
          ...state.isFiltering,
          [action.filterType]: true,
        },
      }

    case HeroesTypes.FILTER_HEROES_FINISH:
      return {
        ...state,
        isFiltering: {
          ...state.isFiltering,
          [action.filterType]: action.filterState
        },
        filteredHero: {
          ...state.filteredHero,
          [action.filterType]: action.filterHero
        },
      }

    default:
      return state
  }
}

export default heroesReducer