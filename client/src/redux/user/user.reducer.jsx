import { UserTypes } from './user.types'

const INIITIAL_STATE = {
  user: null,
  isLoggingIn: false,
  isLoggingOut: false,
  error: null
}

const userReducer = (state = INIITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.LOG_IN_START:
      return {
        ...state,
        user: null,
        isLoggingIn: true,
        error: null
      }

    case UserTypes.LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggingIn: false,
      }

    case UserTypes.LOG_IN_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        error: action.message
      }

    case UserTypes.LOG_OUT_START:
      return {
        ...state,
        isLoggingOut: true,
        error: null
      }

    case UserTypes.LOG_OUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoggingOut: false,
      }

    case UserTypes.LOG_OUT_FAIL:
      return {
        ...state,
        isLoggingOut: false,
        error: action.message
      }

    default:
      return state
  }
}

export default userReducer