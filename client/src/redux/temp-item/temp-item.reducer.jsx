import { TempItemTypes } from './temp-item.types';

const INITIAL_STATE = {
  botTempItem: [],
  userTempItem: []
}

const tempItemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TempItemTypes.SET_BOT_TEMP_ITEM:
      return {
        ...state,
        botTempItem: [...state.botTempItem, action.payload]
      }

    case TempItemTypes.UNSET_BOT_TEMP_ITEM:
      return {
        ...state,
        botTempItem: state.botTempItem.filter(item => item.id !== action.payload.id)
      }

    case TempItemTypes.SET_USER_TEMP_ITEM:
      return {
        ...state,
        userTempItem: [...state.userTempItem, action.payload]
      }

    case TempItemTypes.UNSET_USER_TEMP_ITEM:
      return {
        ...state,
        userTempItem: state.userTempItem.filter(item => item.id !== action.payload.id)
      }

    case TempItemTypes.REFRESH_BOT_TEMP_ITEMS:
      return {
        ...state,
        botTempItem: []
      }

    case TempItemTypes.REFRESH_USER_TEMP_ITEMS:
      return {
        ...state,
        userTempItem: []
      }

    default:
      return state
  }
}

export default tempItemReducer;