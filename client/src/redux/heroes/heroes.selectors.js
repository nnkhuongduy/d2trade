import { createSelector } from 'reselect'

const selectHeroes = state => state.heroes

export const selectHeroesData = createSelector([selectHeroes], state => state.heroes)

export const selectHeroesRendered = createSelector([selectHeroes], state => state.heroesRendered)

export const selectHeroesContainer = createSelector([selectHeroes], state => state.container)

export const selectFilteredHero = createSelector([selectHeroes], state => state.filteredHero)

export const selectFilteredType = createSelector([selectHeroes], state => state.isFiltering)

export const selectFilteredItems = createSelector([selectHeroes], state => state.filteredItemsId)