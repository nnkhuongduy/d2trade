import { createSelector } from 'reselect';

const selectClientStates = state => state.clientStates

export const selectBlackScreenState = createSelector([selectClientStates], state => state.blackScreenState);

export const selectOfferStatus = createSelector([selectClientStates], state => state.offerStatus.status);