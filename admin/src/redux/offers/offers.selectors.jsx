import { createSelector } from 'reselect'

const selectOffersState = state => state.offers

export const selectOffers = createSelector([selectOffersState], state => state.offers)

export const selectOffersFetching = createSelector([selectOffersState], state => state.isFetching)