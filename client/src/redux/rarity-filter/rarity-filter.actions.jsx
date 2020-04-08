import { RarityFilterTypes } from './rarity-filter.types'

export const filterStart = (filterType, rarityValue) => ({
  type: RarityFilterTypes.RARITY_FILTER_START,
  filterType: filterType,
  rarityValue: rarityValue,
})

export const filterFinish = (filterType, filterIds, filterState) => ({
  type: RarityFilterTypes.RARITY_FILTER_FINISH,
  filterType: filterType,
  filterIds: filterIds,
  filterState: filterState
})

export const resetRarityFilter = filterType => ({
  type: RarityFilterTypes.RESET_RARITY_FILTER,
  filterType: filterType
})

export const setRarityContainer = rarityType => ({
  type: RarityFilterTypes.SET_RARITY_CONTAINER,
  rarityType: rarityType
})