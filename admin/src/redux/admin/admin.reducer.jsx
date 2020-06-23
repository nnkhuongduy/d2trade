import { AdminTypes } from './admin.types'

const INITIAL_STATE = {
  admin: null,
  isLoggingIn: false,
  isUpdating: false,
  errorMessage: null
}

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AdminTypes.LOG_IN_START:
      return {
        ...state,
        isLoggingIn: true,
        errorMessage: null,
      }

    case AdminTypes.LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        admin: action.admin
      }

    case AdminTypes.LOG_IN_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        errorMessage: action.message
      }

    case AdminTypes.UPDATE_PASSWORD_START:
      return {
        ...state,
        isUpdating: true,
        errorMessage: null,
      }

    case AdminTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isUpdating: false,
      }

    case AdminTypes.UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        isUpdating: false,
        errorMessage: action.message
      }

    case AdminTypes.BACKGROUND_LOG_IN_START:
      return {
        ...state,
        isLoggingIn: true,
        errorMessage: null,
      }

    case AdminTypes.BACKGROUND_LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        admin: action.admin
      }

    case AdminTypes.BACKGROUND_LOG_IN_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        errorMessage: action.message,
      }

    default:
      return state
  }
}

export default adminReducer