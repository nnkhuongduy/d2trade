import { createSelector } from 'reselect'

const selectCurrentPageState = state => state.currentPage;

export const selectCurrentPage = createSelector([selectCurrentPageState], state => state.currentPage)