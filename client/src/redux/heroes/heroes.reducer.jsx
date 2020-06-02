import { HeroesTypes } from './heroes.types'

const INITIAL_STATE = {
  heroes: null,
  isFetching: false,
  error: null
}

const heroesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HeroesTypes.FETCH_HEROES_START:
      return {
        ...state,
        heroes: null,
        isFetching: true,
        error: null
      }

    case HeroesTypes.FETCH_HEROES_SUCCESS:
      return {
        ...state,
        heroes: action.heroes,
        isFetching: false,
      }

    case HeroesTypes.FETCH_HEROES_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.message
      }

    default:
      return state
  }
}

export default heroesReducer