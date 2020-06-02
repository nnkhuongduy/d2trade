import { InventoryActionTypes } from './inventory.types.jsx';

const INITIAL_STATE = {
  bot: {
    inventory: null,
    isFetching: false,
    errorMessage: null
  },
  user: {
    inventory: null,
    isFetching: false,
    errorMessage: null
  }
}

const inventoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case InventoryActionTypes.FETCH_INVENTORY_START:
      return {
        ...state,
        [action.inventoryType]: {
          ...state[action.inventoryType],
          inventory: null,
          isFetching: true,
          errorMessage: null
        }
      }

    case InventoryActionTypes.FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        [action.inventoryType]: {
          ...state[action.inventoryType],
          isFetching: false,
          inventory: action.inventory,
        }
      }

    case InventoryActionTypes.FETCH_INVENTORY_FAILURE:
      return {
        ...state,
        [action.inventoryType]: {
          ...state[action.inventoryType],
          isFetching: false,
          errorMessage: action.message
        }
      }

    default:
      return state
  }
}

export default inventoryReducer;