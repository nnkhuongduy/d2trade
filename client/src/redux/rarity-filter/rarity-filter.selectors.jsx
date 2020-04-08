import { createSelector } from 'reselect'

const selectRarityFilter = state => state.rarityFilter;

export const selectBotRarityFilteredIds = createSelector([selectRarityFilter], state => state.bot.filteredIds)

export const selectUserRarityFilteredIds = createSelector([selectRarityFilter], state => state.user.filteredIds)

export const selectBotRarityFilteredState = createSelector([selectRarityFilter], state => state.bot.isFiltering)

export const selectUserRarityFilteredState = createSelector([selectRarityFilter], state => state.user.isFiltering)

export const selectBotRarityValue = createSelector([selectRarityFilter], state => state.bot.rarityValue)

export const selectUserRarityValue = createSelector([selectRarityFilter], state => state.user.rarityValue)

export const selectRarityContainer = createSelector([selectRarityFilter], state => state.container)