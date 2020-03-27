import { SlotStateTypes } from './slot-state.types';

export const toggleSlotState = slot => ({
  type: SlotStateTypes.TOGGLE_SLOT_STATE,
  payload: slot
})

export const refreshSlotsState = type => ({
  type: SlotStateTypes.REFRESH_SLOTS_STATE,
  payload: type
})