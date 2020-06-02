import { createSelector } from 'reselect'

const selectBackdrop = state => state.backdrop

export const selectBackdropState = createSelector([selectBackdrop], state => state.state)