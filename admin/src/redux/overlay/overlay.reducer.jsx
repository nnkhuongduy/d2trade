import { OverlayTypes } from './overlay.types'

const INITIAL_STATE = {
  overlayStack: []
}

const overlayReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OverlayTypes.OVERLAY_PUSH:
      return {
        ...state,
        overlayStack: [...state.overlayStack, action.overlayObject]
      }

    case OverlayTypes.OVERLAY_POP_FINISH:
      return {
        ...state,
        overlayStack: []
      }

    default:
      return state
  }
}

export default overlayReducer