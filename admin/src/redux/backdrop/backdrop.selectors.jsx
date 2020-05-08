import { createSelector } from 'reselect'

const selectBackdropState = state => state.backdrop

export const selectBackdrop = createSelector([selectBackdropState], state => state.backdrop)