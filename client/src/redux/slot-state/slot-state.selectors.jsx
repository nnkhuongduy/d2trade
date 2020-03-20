import { createSelector } from 'reselect';

const selectSlotState = state => state.slotState;

export const selectSlotStates = createSelector(
  [selectSlotState],
  slotState => slotState.slotsState
);