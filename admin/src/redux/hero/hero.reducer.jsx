import { HeroTypes } from './hero.types'

const INITIAL_STATE = {
  heroes: null,
  isFetching: false,
  errorMessage: null
}

const heroReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HeroTypes.FETCH_HEROES_START:
      return {
        ...state,
        heroes: null,
        isFetching: true,
        errorMessage: null
      }

    case HeroTypes.FETCH_HEROES_SUCCESS:
      return {
        ...state,
        heroes: action.heroes,
        isFetching: false
      }

    case HeroTypes.FETCH_HEROES_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      }

    default:
      return state
  }
}

export default heroReducer