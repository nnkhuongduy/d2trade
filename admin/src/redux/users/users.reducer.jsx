import { UsersTypes } from './users.types'

const INITIAL_STATE = {
  users: null,
  isFetching: false,
  errorMessage: null,
  isBalanceEditing: false,
  isBalanceModifying: false,
}

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UsersTypes.FETCH_USERS_START:
      return {
        ...state,
        users: null,
        isFetching: true,
        errorMessage: null
      }

    case UsersTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        isFetching: false,
        errorMessage: null
      }

    case UsersTypes.FETCH_USERS_FAIL:
      return {
        ...state,
        users: null,
        isFetching: false,
        errorMessage: action.message
      }

    case UsersTypes.EDIT_BALANCE_START:
      return {
        ...state,
        isBalanceEditing: true,
        errorMessage: null
      }

    case UsersTypes.EDIT_BALANCE_SUCCESS:
      return {
        ...state,
        isBalanceEditing: false,
        errorMessage: null
      }

    case UsersTypes.EDIT_BALANCE_FAIL:
      return {
        ...state,
        isBalanceEditing: false,
        errorMessage: action.message
      }

    case UsersTypes.MODIFY_BALANCE_START:
      return {
        ...state,
        isBalanceModifying: true,
        errorMessage: null
      }

    case UsersTypes.MODIFY_BALANCE_SUCCESS:
      return {
        ...state,
        isBalanceModifying: false,
        errorMessage: null
      }

    case UsersTypes.MODIFY_BALANCE_FAIL:
      return {
        ...state,
        isBalanceModifying: false,
        errorMessage: action.message
      }

    default:
      return state
  }
}

export default usersReducer;