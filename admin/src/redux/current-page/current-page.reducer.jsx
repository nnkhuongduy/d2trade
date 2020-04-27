import { CurrentPageTypes } from './current-page.types'

const INITIAL_STATE = {
  currentPage: null
}

const currentPageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CurrentPageTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page
      }
    default:
      return state;
  }
}

export default currentPageReducer;