import { InventoryActionTypes } from './inventory.types';

const INITIAL_STATE = {
  botInventory: null,
  userInventory: null
}

const inventoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case InventoryActionTypes.SET_BOT_INVENTORY:
      return {
        ...state,
        botInventory: action.payload
      }
    case InventoryActionTypes.SET_USER_INVENTORY:
      return {
        ...state,
        userInventory: action.payload
      }
    default:
      return state
  }
}

export default inventoryReducer;