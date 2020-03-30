import { FilterTypes } from './filter.types'

export const filterStart = (minValue, maxValue) => ({
  type: FilterTypes.FILTER_START,
  minValue: minValue,
  maxValue: maxValue
})