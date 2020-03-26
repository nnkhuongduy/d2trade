import { InventoryActionTypes } from './inventory.types';

const INITIAL_STATE = {
  bot: {
    inventory: null,
    isFetching: false,
    errorMessage: undefined,
    rendered: [],
    temp: []
  },
  user: {
    inventory: null,
    isFetching: false,
    errorMessage: undefined,
    rendered: [],
    temp: []
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
    case InventoryActionTypes.UPDATE_BOT_RENDERED_INVENTORY:
      const botArray = [];
      state.bot.inventory.slice(0, state.bot.rendered.length + InventoryActionTypes.RENDERED_INVENTORY_UPDATE_INTERVAL).forEach(item => botArray.push(item.item.id));
      return {
        ...state,
        bot: {
          ...state.bot,
          rendered: botArray
        }
      }
    case InventoryActionTypes.UPDATE_USER_RENDERED_INVENTORY:
      const userArray = [];
      state.user.inventory.slice(0, state.user.rendered.length + InventoryActionTypes.RENDERED_INVENTORY_UPDATE_INTERVAL).forEach(item => userArray.push(item.item.id));
      return {
        ...state,
        user: {
          ...state.user,
          rendered: userArray
        }
      }
    default:
      return state
  }
}

export default inventoryReducer;