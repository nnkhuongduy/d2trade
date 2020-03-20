import { SlotStateTypes } from './slot-state.types';

const INITIAL_STATE = {
  slotsState: {}
}

const slotStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SlotStateTypes.TOGGLE_SLOT_STATE:
      return {
        ...state,
        slotsState: {
          ...state.slotsState,
          [action.payload.id]: action.payload.status
        }
      }
    default:
      return state
  }
}

export default slotStateReducer;