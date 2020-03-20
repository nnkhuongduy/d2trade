import { SlotStateTypes } from './slot-state.types';

export const toggleSlotState = slot => ({
  type: SlotStateTypes.TOGGLE_SLOT_STATE,
  payload: slot
})