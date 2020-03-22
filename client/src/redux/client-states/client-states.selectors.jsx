import { createSelector } from 'reselect';

const selectClientStates = state => state.clientStates

export const selectBlackScreenState = createSelector([selectClientStates], state => state.blackScreenState);

export const selectServerOfferSuccessState = createSelector([selectClientStates], state => state.serverOfferSuccessState);