import { createSelector } from 'reselect'

const selectHeroesState = state => state.heroes

export const selectHeroes = createSelector([selectHeroesState], state => state.heroes)

export const selectHeroesFetching = createSelector([selectHeroesState], state => state.isFetching)