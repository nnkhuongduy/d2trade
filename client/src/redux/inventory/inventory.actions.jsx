import { InventoryActionTypes } from './inventory.types';

export const fetchInventoryStart = inventoryType => ({
  type: InventoryActionTypes.FETCH_INVENTORY_START,
  inventoryType: inventoryType
})

export const fetchInventorySuccess = (inventoryType, inventory) => ({
  type: InventoryActionTypes.FETCH_INVENTORY_SUCCESS,
  inventoryType: inventoryType,
  inventory: inventory
})

export const fetchInventoryFailure = (inventoryType, errMessage) => ({
  type: InventoryActionTypes.FETCH_INVENTORY_FAILURE,
  inventoryType: inventoryType,
  errMessage: errMessage
})

export const updateRenderedInventoryStart = inventoryType => ({
  type: InventoryActionTypes.UPDATE_RENDERED_INVENTORY_START,
  inventoryType: inventoryType
})

export const updateRenderedInventory = (inventoryType, updateInventory) => ({
  type: InventoryActionTypes.UPDATE_RENDERED_INVENTORY,
  inventoryType: inventoryType,
  updateInventory: updateInventory
})

export const setRenderingInventoryStart = (inventoryType) => ({
  type: InventoryActionTypes.SET_RENDERING_INVENTORY_START,
  inventoryType: inventoryType,
})

export const setRenderingInventory = (inventoryType, inventory) => ({
  type: InventoryActionTypes.SET_RENDERING_INVENTORY,
  inventoryType: inventoryType,
  inventory: inventory
})

export const refreshInventory = inventoryType => ({
  type: InventoryActionTypes.REFRESH_INVENTORY_START,
  inventoryType: inventoryType
})

export const setBalanceItem = (priceVND, priceUSD) => ({
  type: InventoryActionTypes.SET_BALANCE_ITEM,
  priceVND: priceVND,
  priceUSD: priceUSD
})