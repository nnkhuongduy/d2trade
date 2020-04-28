import { UsersTypes } from './users.types'

export const fetchUsersStart = () => ({
  type: UsersTypes.FETCH_USERS_START
})

export const fetchUsersSuccess = users => ({
  type: UsersTypes.FETCH_USERS_SUCCESS,
  users: users
})

export const fetchUsersFail = message => ({
  type: UsersTypes.FETCH_USERS_FAIL,
  message: message
})

export const setBalance = (steamId, value, actionType) => ({
  type: UsersTypes.SET_BALANCE_START,
  steamId: steamId,
  value: value,
  actionType: actionType
})

export const setBalanceSuccess = () => ({
  type: UsersTypes.SET_BALANCE_SUCCESS,
})

export const setBalanceFail = message => ({
  type: UsersTypes.SET_BALANCE_FAIL,
  message: message
})