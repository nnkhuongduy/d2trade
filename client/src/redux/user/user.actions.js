import { UserTypes } from './user.types'

export const logInStart = () => ({
  type: UserTypes.LOG_IN_START,
})

export const logInSuccessful = userData => ({
  type: UserTypes.LOG_IN_SUCCESSFUL,
  userData: userData
})

export const logInFail = errorMessage => ({
  type: UserTypes.LOG_IN_FAIL,
  errorMessage: errorMessage
})

export const logOut = () => ({
  type: UserTypes.LOG_OUT,
})