import { OverlayTypes } from './overlay.types'

const INITIAL_STATE = {
  overlayStack: [{
    data: {},
    type: "NEW_ITEM",
    exec_code: "CONFIRMATION_NEW_ITEM"
  }]
  // overlayStack: []
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
        overlayStack: action.stacks
      }

    case OverlayTypes.OVERLAY_CLEAR:
      return {
        ...state,
        overlayStack: []
      }

    case OverlayTypes.UPDATE_LAST_STACK_FINISH:
      return {
        ...state,
        overlayStack: action.stacks
      }


    default:
      return state
  }
}

export default overlayReducer