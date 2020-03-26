import { createSelector } from 'reselect';

const selectSearching = state => state.searching;

export const selectBotSearchingQuery = createSelector([selectSearching], searching => searching.bot.query);

export const selectUserSearchingQuery = createSelector([selectSearching], searching => searching.user.query);

export const selectBotSearchingState = createSelector([selectSearching], searching => searching.bot.isSearching);

export const selectUserSearchingState = createSelector([selectSearching], searching => searching.user.isSearching);

export const selectBotQueryIds = createSelector([selectSearching], searching => searching.bot.queryItemsId);

export const selectUserQueryIds = createSelector([selectSearching], searching => searching.user.queryItemsId);