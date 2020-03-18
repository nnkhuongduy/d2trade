import { InventoryActionTypes } from './inventory.types';

export const getBotInventory = inventory => ({
  type: InventoryActionTypes.GET_BOT_INVENTORY,
  payload: inventory
})