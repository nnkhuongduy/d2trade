import { createSelector } from 'reselect'

const selectReceiptsState = state => state.receipts

export const selectReceipts = createSelector([selectReceiptsState], state => state.receipts)

export const selectFetching = createSelector([selectReceiptsState], state => state.isFetching)