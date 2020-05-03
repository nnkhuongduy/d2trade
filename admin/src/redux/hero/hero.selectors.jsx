import { createSelector } from 'reselect'

const selectHeroState = state => state.hero

export const selectHeroes = createSelector([selectHeroState], state => state.heroes)