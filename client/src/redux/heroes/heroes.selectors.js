import { createSelector } from 'reselect'

const selectHeroes = state => state.heroes

export const selectHeroesData = createSelector([selectHeroes], state => state.heroes)

export const selectHeroesRendered = createSelector([selectHeroes], state => state.heroesRendered)

export const selectHeroesContainer = createSelector([selectHeroes], state => state.container)

export const selectBotFilteredHero = createSelector([selectHeroes], state => state.bot.filteredHero)

export const selectUserFilteredHero = createSelector([selectHeroes], state => state.user.filteredHero)

export const selectBotFilteredState = createSelector([selectHeroes], state => state.bot.isHeroFiltering)

export const selectUserFilteredState = createSelector([selectHeroes], state => state.user.isHeroFiltering)

export const selectBotFilteredItems = createSelector([selectHeroes], state => state.bot.filteredItemIds)

export const selectUserFilteredItems = createSelector([selectHeroes], state => state.user.filteredItemIds)