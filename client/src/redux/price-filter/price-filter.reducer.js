import { PriceFilterTypes } from './price-filter.types'

const INITIAL_STATE = {
  bot: {
    minValue: 0,
    maxValue: 0,
    isPriceFiltering: false,
    filteredIds: []
  },
  user: {
    minValue: 0,
    maxValue: 0,
    isPriceFiltering: false,
    filteredIds: []
  }
}

export const priceFilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PriceFilterTypes.PRICE_FILTER_START:
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          minValue: action.minValue,
          maxValue: action.maxValue
        }
      }

    case PriceFilterTypes.PRICE_FILTER_FINSIH:
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          filteredIds: action.filterIds,
          isPriceFiltering: action.filterState
        }
      }

    case PriceFilterTypes.RESET_PRICE_FILTER:
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          minValue: 0,
          maxValue: 0,
          isPriceFiltering: false,
          filteredIds: []
        }
      }

    default:
      return state
  }
}

export default priceFilterReducer;