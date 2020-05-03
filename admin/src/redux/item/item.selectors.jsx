import { createSelector } from 'reselect'

const selectItemState = state => state.item

export const selectItem = createSelector([selectItemState], state => state.item)

export const selectFetchingState = createSelector([selectItemState], state => state.isFetching)