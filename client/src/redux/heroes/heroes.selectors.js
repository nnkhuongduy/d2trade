import { createSelector } from 'reselect'

const selectHeroes = state => state.heroes

export const selectHeroesData = createSelector([selectHeroes], state => state.heroes)