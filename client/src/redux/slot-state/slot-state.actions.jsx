import { SlotStateTypes } from './slot-state.types';

export const toggleSlotState = (slotType, id, status) => ({
  type: SlotStateTypes.TOGGLE_SLOT_STATE,
  slotType: slotType,
  id: id,
  status: status
})

export const refreshSlotsState = (slotType) => ({
  type: SlotStateTypes.REFRESH_SLOTS_STATE,
  slotType: slotType
})