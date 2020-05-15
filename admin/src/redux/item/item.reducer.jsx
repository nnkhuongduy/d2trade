import { ItemTypes } from './item.types'

const INITIAL_STATE = {
  item: null,
  items: null,
  isFetching: false,
  isPosting: false,
  isAllFetching: false,
  isDeleting: false,
  isPutting: false,
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

    case ItemTypes.POST_ITEM_START:
      return {
        ...state,
        isPosting: true,
        errorMessage: null
      }

    case ItemTypes.POST_ITEM_SUCCESS:
      return {
        ...state,
        isPosting: false,
      }

    case ItemTypes.POST_ITEM_FAIL:
      return {
        ...state,
        isPosting: false,
        errorMessage: action.message
      }

    case ItemTypes.FETCH_ITEMS_START:
      return {
        ...state,
        items: null,
        isAllFetching: true,
        errorMessage: null
      }

    case ItemTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        isAllFetching: false,
        items: action.items
      }

    case ItemTypes.FETCH_ITEMS_FAIL:
      return {
        ...state,
        isAllFetching: false,
        errorMessage: action.message
      }

    case ItemTypes.DELETE_ITEMS_START:
      return {
        ...state,
        isDeleting: true,
        errorMessage: null
      }

    case ItemTypes.DELETE_ITEMS_SUCCESS:
      return {
        ...state,
        isDeleting: false,
      }

    case ItemTypes.DELETE_ITEMS_FAIL:
      return {
        ...state,
        isDeleting: false,
        errorMessage: action.message
      }

    case ItemTypes.PUT_ITEM_START:
      return {
        ...state,
        isPutting: true,
        errorMessage: null
      }

    case ItemTypes.PUT_ITEM_SUCCESS:
      return {
        ...state,
        isPutting: false,
      }

    case ItemTypes.PUT_ITEM_FAIL:
      return {
        ...state,
        isPutting: false,
        errorMessage: action.message
      }

    default:
      return state
  }
}

export default itemReducer