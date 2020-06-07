import { InventoryActionTypes } from './inventory.types.jsx';

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

export const fetchAllInventory = () => ({
  type: InventoryActionTypes.FETCH_ALL_INVENTORY
})