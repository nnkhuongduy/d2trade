import { FilterTypes } from './filter.types'

const INITIAL_STATE = {

}

export const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterTypes.FILTER_START:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default filterReducer;