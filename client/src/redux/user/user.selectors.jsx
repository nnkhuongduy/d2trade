import { createSelector } from 'reselect'

const selectUser = state => state.user

export const selectCurrentUser = createSelector([selectUser], state => state.user)

export const selectOffers = createSelector([selectUser], state => state.offers)

export const selectFetchingOffers = createSelector([selectUser], state => state.isFetchingOffers)