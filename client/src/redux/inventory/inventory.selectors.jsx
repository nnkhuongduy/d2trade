import { createSelector } from 'reselect';

const selectInventory = state => state.inventory;

export const selectBotInventory = createSelector([selectInventory], inventory => inventory.bot.inventory);

export const selectUserInventory = createSelector([selectInventory], inventory => inventory.user.inventory);