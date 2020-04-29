import { FilterTypes } from './filter.types'

export const setUserFilter = filter => ({
  type: FilterTypes.SET_USER_FILTER,
  filter: filter
})