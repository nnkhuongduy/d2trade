import { SlotStateTypes } from './slot-state.types';

const INITIAL_STATE = {
  bot: {},
  user: {}
}

const slotStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SlotStateTypes.TOGGLE_SLOT_STATE:
      return {
        ...state,
        [action.slotType]: {
          ...state[action.slotType],
          [action.id]: action.status
        }
      }

    case SlotStateTypes.REFRESH_SLOTS_STATE:
      return {
        ...state,
        [action.slotType]: {}
      }

    default:
      return state
  }
}

export default slotStateReducer;