import { SearchingTypes } from './searching.types';

export const setQueryItemsStart = (queryType, query) => ({
  type: SearchingTypes.SET_QUERY_ITEMS_START,
  queryType: queryType,
  query: query
})

export const setQueryItems = (queryType, queryArray, query, queryState) => ({
  type: SearchingTypes.SET_QUERY_ITEMS,
  queryType: queryType,
  queryArray: queryArray,
  query: query,
  queryState: queryState
})

export const refreshQuery = queryType => ({
  type: SearchingTypes.REFRESH_QUERY,
  queryType: queryType
})

export const heroSearchingStart = query => ({
  type: SearchingTypes.HERO_SEARCHING_START,
  payload: query
})