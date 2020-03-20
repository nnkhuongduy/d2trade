import { TempItemTypes } from './temp-item.types';

const INITIAL_STATE = {
  tempItem: []
}

const tempItemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TempItemTypes.SET_TEMP_ITEM:
      return {
        ...state,
        tempItem: [...state.tempItem, action.payload]
      }
    case TempItemTypes.UNSET_TEMP_ITEM:
      return {
        ...state,
        tempItem: state.tempItem.filter(item => item.id !== action.payload.id)
      }
    default:
      return state
  }
}

export default tempItemReducer;