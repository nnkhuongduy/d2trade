import { HeroesTypes } from './heroes.types'

const INITIAL_STATE = {
  heroes: [],
  isFetching: false,
  errorMessage: null
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

    default:
      return state
  }
}

export default heroesReducer