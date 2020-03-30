import { SearchingTypes } from './searching.types';

const INITIAL_STATE = {
  bot: {
    isSearching: false,
    query: "",
    queryItemsId: [],
    isFilter: false,
    filteredItems: []
  },
  user: {
    isSearching: false,
    query: "",
    queryItemsId: [],
    isFilter: false,
    filteredItems: []
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

    case SearchingTypes.REFRESH_BOT_QUERY:
      return {
        ...state,
        bot: {
          ...state.bot,
          isSearching: false,
          query: "",
          queryItemsId: []
        }
      }

    case SearchingTypes.REFRESH_USER_QUERY:
      return {
        ...state,
        user: {
          ...state.user,
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