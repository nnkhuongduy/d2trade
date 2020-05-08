import { UsersTypes } from './users.types'

const INITIAL_STATE = {
  users: [],
  isFetching: false,
  errorMessage: null,
  isBalanceSetting: false,
}

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UsersTypes.FETCH_USERS_START:
      return {
        ...state,
        users: state.users.length === 0 ? state.users : [],
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
        users: state.users.length === 0 ? state.users : [],
        isFetching: false,
        errorMessage: action.message
      }

    case UsersTypes.SET_BALANCE_START:
      return {
        ...state,
        isBalanceSetting: true,
        errorMessage: null,
        balanceSetState: state.balanceSetState === '' ? state.balanceSetState : ''
      }

    case UsersTypes.SET_BALANCE_SUCCESS:
      return {
        ...state,
        isBalanceSetting: false,
        errorMessage: null,
      }

    case UsersTypes.SET_BALANCE_FAIL:
      return {
        ...state,
        isBalanceSetting: false,
        errorMessage: action.message,
      }

    default:
      return state
  }
}

export default usersReducer;