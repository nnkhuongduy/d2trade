import { SearchingTypes } from './searching.types';

const INITIAL_STATE = {
  bot: {
    isSearching: false,
    query: "",
    queryItemsId: []
  },
  user: {
    isSearching: false,
    query: "",
    queryItemsId: []
  }
}

export const searchingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchingTypes.SET_BOT_SEARCHING_QUERY:
      return {
        ...state,
        bot: {
          ...state.bot,
          isSearching: action.payload === "" ? false : true,
          query: action.payload
        }
      }

    case SearchingTypes.SET_USER_SEARCHING_QUERY:
      return {
        ...state,
        user: {
          ...state.user,
          isSearching: action.payload === "" ? false : true,
          query: action.payload
        }
      }

    case SearchingTypes.SET_BOT_QUERY_ITEMS:
      return {
        ...state,
        bot: {
          ...state.bot,
          queryItemsId: action.payload
        }
      }

    case SearchingTypes.SET_USER_QUERY_ITEMS:
      return {
        ...state,
        user: {
          ...state.user,
          queryItemsId: action.payload
        }
      }

    default:
      return state
  }
}

export default searchingReducer