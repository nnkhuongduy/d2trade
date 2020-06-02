import { createSelector } from 'reselect'

const selectOffer = state => state.offer

export const selectUrlDialog = createSelector([selectOffer], state => state.dialog.url)

export const selectOfferDialog = createSelector([selectOffer], state => state.dialog.offer)