import { PriceFilterTypes } from './price-filter.types'

export const filterStart = (filterType, minValue, maxValue) => ({
  type: PriceFilterTypes.PRICE_FILTER_START,
  filterType: filterType,
  minValue: minValue,
  maxValue: maxValue
})

export const filterFinish = (filterType, filterIds, filterState) => ({
  type: PriceFilterTypes.PRICE_FILTER_FINSIH,
  filterType: filterType,
  filterIds: filterIds,
  filterState: filterState
})

export const resetPriceFilter = filterType => ({
  type: PriceFilterTypes.RESET_PRICE_FILTER,
  filterType: filterType
})