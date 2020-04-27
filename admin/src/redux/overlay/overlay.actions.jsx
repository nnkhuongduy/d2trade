import { OverlayTypes } from './overlay.types'

export const pushOverlay = overlayObject => ({
  type: OverlayTypes.OVERLAY_PUSH,
  overlayObject: overlayObject
})

export const popOverlayStart = decision => ({
  type: OverlayTypes.OVERLAY_POP_START,
  decision: decision
})

export const popOverlayFinish = () => ({
  type: OverlayTypes.OVERLAY_POP_FINISH,
})