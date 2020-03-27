import { createSelector } from 'reselect'

const selectHeroes = state => state.heroes

export const selectHeroesData = createSelector([selectHeroes], state => state.heroes)

export const selectHeroesContainer = createSelector([selectHeroes], state => state.container)

export const selectFilteredHero = createSelector([selectHeroes], state => state.filteredHero)

export const selectFilteredType = createSelector([selectHeroes], state => state.isFiltering)