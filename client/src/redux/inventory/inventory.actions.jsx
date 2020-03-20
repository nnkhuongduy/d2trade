import { InventoryActionTypes } from './inventory.types';

export const setBotInventory = inventory => ({
  type: InventoryActionTypes.SET_BOT_INVENTORY,
  payload: inventory
})

export const setUserInventory = inventory => ({
  type: InventoryActionTypes.SET_USER_INVENTORY,
  payload: inventory
})