import { BackdropTypes } from './backdrop.types'

export const setBackdrop = state => ({
  type: BackdropTypes.SET_BACKDROP,
  state: state
})