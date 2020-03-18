import { InventoryActionTypes } from './inventory.types';

const INITIAL_STATE = {
  inventory: null
}

const botInventoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case InventoryActionTypes.GET_BOT_INVENTORY:
      return {
        ...state,
        inventory: action.payload
      }
    default:
      return state
  }
}

export default botInventoryReducer;