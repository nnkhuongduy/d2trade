import { TempItemTypes } from './temp-item.types';

const INITIAL_STATE = {
  tempItem: {
    bot: [],
    user: []
  }
}

const tempItemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TempItemTypes.SET_TEMP_ITEM:
      return {
        ...state,
        tempItem: {
          ...state.tempItem,
          [action.tempType]: [...state.tempItem[action.tempType], action.item]
        }
      }

    case TempItemTypes.UNSET_TEMP_ITEM:
      return {
        ...state,
        tempItem: {
          ...state.tempItem,
          [action.tempType]: state.tempItem[action.tempType].filter(item => item.id !== action.item.id)
        }
      }

    case TempItemTypes.REFRESH_TEMP_ITEMS:
      return {
        ...state,
        tempItem: {
          ...state.tempItem,
          [action.tempType]: []
        }
      }

    default:
      return state
  }
}

export default tempItemReducer;