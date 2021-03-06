import { StashTypes } from './stash.types'

export const updateStashStart = (inventoryType, actionType, item) => ({
  type: StashTypes.UPDATE_STASH_START,
  item: item,
  inventoryType: inventoryType,
  actionType: actionType
})

export const updateStashFinish = (inventoryType, stash) => ({
  type: StashTypes.UPDATE_STASH_FINISH,
  stash: stash,
  inventoryType: inventoryType,
})

export const resetStash = inventoryType => ({
  type: StashTypes.RESET_STASH,
  inventoryType: inventoryType
})

export const resetAllStash = () => ({
  type: StashTypes.RESET_ALL_STASH
})