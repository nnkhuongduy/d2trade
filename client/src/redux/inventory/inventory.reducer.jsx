import { InventoryActionTypes } from './inventory.types';

const INITIAL_STATE = {
  bot: {
    inventory: null,
    isFetching: false,
    errorMessage: undefined
  },
  user: {
    inventory: null,
    isFetching: false,
    errorMessage: undefined
  }
}

const inventoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case InventoryActionTypes.FETCH_BOT_INVENTORY_START:
      return {
        ...state,
        bot: {
          ...state.bot,
          isFetching: true
        }
      }
    case InventoryActionTypes.FETCH_BOT_INVENTORY_SUCCESS:
      return {
        ...state,
        bot: {
          ...state.bot,
          isFetching: false,
          inventory: action.payload
        }
      }
    case InventoryActionTypes.FETCH_BOT_INVENTORY_FAILURE:
      return {
        ...state,
        bot: {
          ...state.bot,
          isFetching: false,
          errorMessage: action.payload
        }
      }
    case InventoryActionTypes.FETCH_USER_INVENTORY_START:
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: true
        }
      }
    case InventoryActionTypes.FETCH_USER_INVENTORY_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: false,
          inventory: action.payload
        }
      }
    case InventoryActionTypes.FETCH_USER_INVENTORY_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          isFetching: false,
          errorMessage: action.payload
        }
      }
    default:
      return state
  }
}

export default inventoryReducer;