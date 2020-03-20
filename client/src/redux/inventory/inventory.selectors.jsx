import { createSelector } from 'reselect';

const selectBotInventory = state => state.botInventory;

export const selectInventory = createSelector([selectBotInventory], botInventory => botInventory.inventory);