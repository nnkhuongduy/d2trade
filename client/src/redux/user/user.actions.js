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

export const editUserInfo = (infoObj) => ({
  type: UserTypes.EDIT_USER_INFO,
  infoObj: infoObj
})

export const editUserInfoFinish = (infoObj, editState) => ({
  type: UserTypes.EDIT_USER_INFO_FINISH,
  infoObj: infoObj,
  editState: editState
})
