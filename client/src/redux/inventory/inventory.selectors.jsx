import { createSelector } from 'reselect';

const selectInventory = state => state.inventory;

export const selectInventoryState = createSelector([selectInventory], inventory => inventory);

export const selectBotInventoryState = createSelector([selectInventory], inventory => inventory.bot);

export const selectUserInventoryState = createSelector([selectInventory], inventory => inventory.user);

export const selectBotInventory = createSelector([selectInventory], inventory => inventory.bot.inventory);

export const selectUserInventory = createSelector([selectInventory], inventory => inventory.user.inventory);

export const selectBotRenderingInventory = createSelector([selectInventory], inventory => inventory.bot.rendering);

export const selectUserRenderingInventory = createSelector([selectInventory], inventory => inventory.user.rendering);

export const selectBotRenderedInventory = createSelector([selectInventory], inventory => inventory.bot.rendered);

export const selectUserRenderedInventory = createSelector([selectInventory], inventory => inventory.user.rendered);