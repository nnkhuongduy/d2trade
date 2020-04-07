import { InventoryActionTypes } from './inventory.types';

const INITIAL_STATE = {
  bot: {
    inventory: null,
    isFetching: false,
    errorMessage: undefined,
    rendered: [],
    rendering: []
  },
  user: {
    inventory: null,
    isFetching: false,
    errorMessage: undefined,
    rendered: [],
    rendering: []
  }
}

const inventoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case InventoryActionTypes.FETCH_INVENTORY_START:
      return {
        ...state,
        [action.inventoryType]: {
          ...state[action.inventoryType],
          isFetching: true
        }
      }

    case InventoryActionTypes.FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        [action.inventoryType]: {
          ...state[action.inventoryType],
          isFetching: false,
          inventory: action.inventory,
          errorMessage: undefined,
        }
      }

    case InventoryActionTypes.FETCH_INVENTORY_FAILURE:
      return {
        ...state,
        [action.inventoryType]: {
          ...state[action.inventoryType],
          isFetching: false,
          errorMessage: action.errMessage
        }
      }

    case InventoryActionTypes.UPDATE_RENDERED_INVENTORY:
      return {
        ...state,
        [action.inventoryType]: {
          ...state[action.inventoryType],
          rendered: action.updateInventory
        }
      }

    case InventoryActionTypes.SET_RENDERING_INVENTORY:
      return {
        ...state,
        [action.inventoryType]: {
          ...state[action.inventoryType],
          rendering: action.inventory
        }
      }

    case InventoryActionTypes.REFRESH_INVENTORY_START:
      return {
        ...state,
        [action.inventoryType]: {
          ...state[action.inventoryType],
          inventory: null,
          errorMessage: undefined,
          rendered: []
        }
      }

    case InventoryActionTypes.SET_BALANCE_ITEM:
      const prevState = {
        ...state
      }
      prevState.user.inventory[0].vnd_price = action.priceVND;
      prevState.user.inventory[0].market_price = action.priceUSD;
      return prevState

    default:
      return state
  }
}

export default inventoryReducer;