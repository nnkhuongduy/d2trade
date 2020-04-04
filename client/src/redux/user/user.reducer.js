import { UserTypes } from './user.types'

const INITIAL_STATE = {
  isLoggingIn: false,
  user: null,
  errorMessage: null,
  isEditingSuccess: undefined,
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

    case UserTypes.EDIT_USER_INFO_FINISH:
      if (action.infoObj !== null)
        return {
          ...state,
          user: {
            ...state.user,
            ...action.infoObj
          },
          isEditingSuccess: action.editState
        }
      else return {
        ...state,
        isEditingSuccess: action.editState
      }

    default:
      return state
  }
}

export default userReducer;