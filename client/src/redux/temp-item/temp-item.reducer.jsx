import { TempItemTypes } from './temp-item.types';

const INITIAL_STATE = {
  tempItem: {
    bot: [],
    user: []
  },
  price: {
    bot: '0.00',
    user: '0.00'
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

    case TempItemTypes.UPDATE_PRICE:
      return {
        ...state,
        price: {
          ...state.price,
          [action.priceType]: action.price
        }
      }

    default:
      return state
  }
}

export default tempItemReducer;