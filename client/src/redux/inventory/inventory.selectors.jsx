import { createSelector } from 'reselect';

const selectInventory = state => state.inventory;

export const selectBotInventory = createSelector([selectInventory], state => state.bot.inventory);

export const selectUserInventory = createSelector([selectInventory], state => state.user.inventory);

export const selectBotFetching = createSelector([selectInventory], state => state.bot.isFetching);

export const selectUserFetching = createSelector([selectInventory], state => state.user.isFetching);