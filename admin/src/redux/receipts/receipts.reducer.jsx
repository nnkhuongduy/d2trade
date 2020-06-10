import { ReceiptsTypes } from './receipts.types'

const INITIAL_STATE = {
  receipts: [],
  isFetching: false,
  error: null
}

const receiptsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReceiptsTypes.FETCH_RECEIPTS_START:
      return {
        ...state,
        isFetching: true,
        error: null
      }

    case ReceiptsTypes.FETCH_RECEIPTS_SUCCESS:
      return {
        ...state,
        receipts: action.receipts,
        isFetching: false,
      }

    case ReceiptsTypes.FETCH_RECEIPTS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.message
      }

    default:
      return state
  }
}

export default receiptsReducer