import { RarityFilterTypes } from './rarity-filter.types'

const INITIAL_STATE = {
  container: null,
  bot: {
    rarityValue: null,
    isFiltering: false,
    filteredIds: []
  },
  user: {
    rarityValue: null,
    isFiltering: false,
    filteredIds: []
  }
}

export const rarityFilterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RarityFilterTypes.RARITY_FILTER_START:
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          rarityValue: action.rarityValue,
        }
      }

    case RarityFilterTypes.RARITY_FILTER_FINISH:
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          filteredIds: action.filterIds,
          isFiltering: action.filterState
        }
      }

    case RarityFilterTypes.RESET_RARITY_FILTER:
      return {
        ...state,
        [action.filterType]: {
          ...state[action.filterType],
          rarityValue: null,
          isFiltering: false,
          filteredIds: []
        }
      }

    case RarityFilterTypes.SET_RARITY_CONTAINER:
      return {
        ...state,
        container: action.rarityType
      }

    default:
      return state
  }
}

export default rarityFilterReducer;