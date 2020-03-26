import { SearchingTypes } from './searching.types';

export const setBotSearchingQuery = query => ({
  type: SearchingTypes.SET_BOT_SEARCHING_QUERY,
  payload: query
})

export const setUserSearchingQuery = query => ({
  type: SearchingTypes.SET_USER_SEARCHING_QUERY,
  payload: query
})

export const setBotQueryItems = queryArray => ({
  type: SearchingTypes.SET_BOT_QUERY_ITEMS,
  payload: queryArray
})

export const setUserQueryItems = queryArray => ({
  type: SearchingTypes.SET_USER_QUERY_ITEMS,
  payload: queryArray
})
