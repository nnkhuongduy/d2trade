import { createSelector } from 'reselect';

const selectSlotState = state => state.slotState;

export const selectBotSlotStates = createSelector([selectSlotState], slotState => slotState.bot);

export const selectUserSlotStates = createSelector([selectSlotState], slotState => slotState.user);