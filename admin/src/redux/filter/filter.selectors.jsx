import { createSelector } from 'reselect'

const selectFilterState = state => state.filter

export const selectUserFilter = createSelector([selectFilterState], state => state.userFilter)