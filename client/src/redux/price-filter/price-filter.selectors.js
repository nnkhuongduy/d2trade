import { createSelector } from 'reselect'

const selectPriceFilter = state => state.priceFilter;

export const selectBotMinPrice = createSelector([selectPriceFilter], state => state.bot.minValue)

export const selectBotMaxPrice = createSelector([selectPriceFilter], state => state.bot.maxValue)

export const selectUserMinPrice = createSelector([selectPriceFilter], state => state.user.minValue)

export const selectUserMaxPrice = createSelector([selectPriceFilter], state => state.user.maxValue)

export const selectBotPriceFilteredIds = createSelector([selectPriceFilter], state => state.bot.filteredIds)

export const selectUserPriceFilteredIds = createSelector([selectPriceFilter], state => state.user.filteredIds)

export const selectBotPriceFilteredState = createSelector([selectPriceFilter], state => state.bot.isPriceFiltering)

export const selectUserPriceFilteredState = createSelector([selectPriceFilter], state => state.user.isPriceFiltering)