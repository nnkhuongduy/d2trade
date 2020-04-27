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

export const editBalanceStart = (steamId, value) => ({
  type: UsersTypes.EDIT_BALANCE_START,
  steamId: steamId,
  value: value
})

export const editBalanceSuccess = () => ({
  type: UsersTypes.EDIT_BALANCE_SUCCESS,
})

export const editBalanceFail = message => ({
  type: UsersTypes.EDIT_BALANCE_FAIL,
  message: message
})

export const modifyBalanceStart = (steamId, value) => ({
  type: UsersTypes.MODIFY_BALANCE_START,
  steamId: steamId,
  value: value
})

export const modifyBalanceSuccess = () => ({
  type: UsersTypes.MODIFY_BALANCE_SUCCESS,
})

export const modifyBalanceFail = message => ({
  type: UsersTypes.MODIFY_BALANCE_FAIL,
  message: message
})