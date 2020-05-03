import { ItemTypes } from './item.types'

const INITIAL_STATE = {
  item: null,
  isFetching: false,
  errorMessage: null
}

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ItemTypes.FETCH_ITEM_START:
      return {
        ...state,
        item: null,
        isFetching: true,
        errorMessage: null
      }

    case ItemTypes.FETCH_ITEM_SUCCESS:
      return {
        ...state,
        item: action.item,
        isFetching: false,
      }

    case ItemTypes.FETCH_ITEM_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      }

    default:
      return state
  }
}

export default itemReducer