import { OverlayTypes } from './overlay.types'

export const pushOverlay = overlayObject => ({
  type: OverlayTypes.OVERLAY_PUSH,
  overlayObject: overlayObject
})

export const popOverlayStart = decision => ({
  type: OverlayTypes.OVERLAY_POP_START,
  decision: decision
})

export const popOverlayFinish = stacks => ({
  type: OverlayTypes.OVERLAY_POP_FINISH,
  stacks: stacks
})

export const clearOverlay = () => ({
  type: OverlayTypes.OVERLAY_CLEAR
})

export const updateLastStack = stack => ({
  type: OverlayTypes.UPDATE_LAST_STACK_START,
  stack: stack,
})

export const updateLastStackFinish = stacks => ({
  type: OverlayTypes.UPDATE_LAST_STACK_FINISH,
  stacks: stacks
})