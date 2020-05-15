import { createSelector } from 'reselect'

const selectItemState = state => state.item

export const selectItem = createSelector([selectItemState], state => state.item)

export const selectFetchingState = createSelector([selectItemState], state => state.isFetching)

export const selectPostingState = createSelector([selectItemState], state => state.isPosting)

export const selectItems = createSelector([selectItemState], state => state.items)

export const selectFetchingItems = createSelector([selectItemState], state => state.isAllFetching)

export const selectDeletingState = createSelector([selectItemState], state => state.isDeleting)

export const selectPuttingState = createSelector([selectItemState], state => state.isPutting)