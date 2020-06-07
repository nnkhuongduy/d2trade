import { SiteTypes } from './site.types'

const INITIAL_STATE = {
}

const siteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SiteTypes.RESET:
      return {
        ...state,
      }

    default:
      return state
  }
}

export default siteReducer