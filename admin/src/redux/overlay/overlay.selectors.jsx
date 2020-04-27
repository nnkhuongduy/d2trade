import { createSelector } from 'reselect'

export const selectOverlayState = state => state.overlay

export const selectOverlayStack = createSelector([selectOverlayState], state => state.overlayStack)

export const selectOverlayLastStack = createSelector([selectOverlayStack], stack => stack[stack.length - 1])
