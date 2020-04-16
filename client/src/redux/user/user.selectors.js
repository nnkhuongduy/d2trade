import { createSelector } from 'reselect'

const selectUserState = state => state.user;

export const selectCurrentUser = createSelector([selectUserState], state => state.user)

export const selectUserEditingState = createSelector([selectUserState], state => state.isEditingSuccess)

export const selectFetchOffersState = createSelector([selectUserState], state => state.isFetchingOffers)

export const selectUserOffers = createSelector([selectUserState], state => state.offers)