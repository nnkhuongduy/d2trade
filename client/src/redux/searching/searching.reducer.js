import { SearchingTypes } from './searching.types';

const INITIAL_STATE = {
  bot: {
    isSearching: false,
    query: "",
    queryItemsId: [],
  },
  user: {
    isSearching: false,
    query: "",
    queryItemsId: [],
  }
}

export const searchingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchingTypes.SET_QUERY_ITEMS:
      return {
        ...state,
        [action.queryType]: {
          ...state[action.queryType],
          isSearching: action.queryState,
          query: action.query,
          queryItemsId: action.queryArray
        }
      }

    case SearchingTypes.REFRESH_QUERY:
      return {
        ...state,
        [action.queryType]: {
          ...state[action.queryType],
          isSearching: false,
          query: "",
          queryItemsId: []
        }
      }

    case SearchingTypes.HERO_SEARCHING_START:
      return {
        ...state
      }

    default:
      return state
  }
}

export default searchingReducer