import { AdminTypes } from './admin.types'

export const logInStart = logInObj => ({
  type: AdminTypes.LOG_IN_START,
  logInObj: logInObj
})

export const logInSuccess = admin => ({
  type: AdminTypes.LOG_IN_SUCCESS,
  admin: admin
})

export const logInFail = message => ({
  type: AdminTypes.LOG_IN_FAIL,
  message: message
})

export const logOutStart = () => ({
  type: AdminTypes.LOG_OUT_START,
})

export const logOutSuccess = () => ({
  type: AdminTypes.LOG_OUT_SUCCESS,
})

export const logOutFail = message => ({
  type: AdminTypes.LOG_OUT_FAIL,
  message: message
})

export const updatePasswordStart = password => ({
  type: AdminTypes.UPDATE_PASSWORD_START,
  password: password
})

export const updatePasswordSuccess = () => ({
  type: AdminTypes.UPDATE_PASSWORD_SUCCESS,
})

export const updatePasswordFail = message => ({
  type: AdminTypes.UPDATE_PASSWORD_FAIL,
  message: message
})

export const updateInfoStart = info => ({
  type: AdminTypes.UPDATE_INFO_START,
  info: info
})

export const updateInfoSuccess = () => ({
  type: AdminTypes.UPDATE_INFO_SUCCESS,
})

export const updateInfoFail = message => ({
  type: AdminTypes.UPDATE_INFO_FAIL,
  message: message
})

export const backgroundLogInStart = () => ({
  type: AdminTypes.BACKGROUND_LOG_IN_START
})

export const backgroundLogInSuccess = admin => ({
  type: AdminTypes.BACKGROUND_LOG_IN_SUCCESS,
  admin: admin
})

export const backgroundLogInFail = message => ({
  type: AdminTypes.BACKGROUND_LOG_IN_FAIL,
  message: message
})