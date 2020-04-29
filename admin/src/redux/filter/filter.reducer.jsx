import { FilterTypes } from './filter.types'

const INITIAL_STATE = {
  userFilter: null
}

const userFilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterTypes.SET_USER_FILTER:
      return {
        ...state,
        userFilter: action.filter
      }

    default:
      return state
  }
}

export default userFilterReducer