import { InventoryActionTypes } from './inventory.types';

export const fetchBotInventoryStart = () => ({
  type: InventoryActionTypes.FETCH_BOT_INVENTORY_START,
})

export const fetchBotInventorySuccess = inventory => ({
  type: InventoryActionTypes.FETCH_BOT_INVENTORY_SUCCESS,
  payload: inventory
})

export const fetchBotInventoryFailure = () => ({
  type: InventoryActionTypes.FETCH_BOT_INVENTORY_FAILURE,
})

export const fetchUserInventoryStart = () => ({
  type: InventoryActionTypes.FETCH_USER_INVENTORY_START,
})

export const fetchUserInventorySuccess = inventory => ({
  type: InventoryActionTypes.FETCH_USER_INVENTORY_SUCCESS,
  payload: inventory
})

export const fetchUserInventoryFailure = () => ({
  type: InventoryActionTypes.FETCH_USER_INVENTORY_FAILURE,
})

export const updateBotRenderedInventoryStart = () => ({
  type: InventoryActionTypes.UPDATE_BOT_RENDERED_INVENTORY_START
})

export const updateUserRenderedInventoryStart = () => ({
  type: InventoryActionTypes.UPDATE_USER_RENDERED_INVENTORY_START
})

export const updateBotRenderedInventory = updateArray => ({
  type: InventoryActionTypes.UPDATE_BOT_RENDERED_INVENTORY,
  payload: updateArray
})

export const updateUserRenderedInventory = updateArray => ({
  type: InventoryActionTypes.UPDATE_USER_RENDERED_INVENTORY,
  payload: updateArray
})