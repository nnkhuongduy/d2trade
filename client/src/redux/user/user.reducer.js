import { UserTypes } from './user.types'

const INITIAL_STATE = {
  isLoggingIn: false,
  user: null,
  errorMessage: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.LOG_IN_START:
      return {
        ...state,
        isLoggingIn: true,
      }

    case UserTypes.LOG_IN_SUCCESSFUL:
      return {
        ...state,
        isLoggingIn: false,
        user: action.userData
      }

    case UserTypes.LOG_IN_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        errorMessage: action.errorMessage
      }

    case UserTypes.LOG_OUT:
      return {
        ...state,
        user: null,
        errorMessage: null
      }

    default:
      return state
  }
}

export default userReducer;