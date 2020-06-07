import { StashTypes } from './stash.types'

const INITIAL_STATE = {
  bot: [],
  user: []
}

const stashReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StashTypes.UPDATE_STASH_FINISH:
      return {
        ...state,
        [action.inventoryType]: action.stash
      }

    case StashTypes.RESET_STASH:
      return {
        ...state,
        [action.inventoryType]: []
      }

    case StashTypes.RESET_ALL_STASH:
      return {
        ...state,
        bot: [],
        user: []
      }

    default:
      return state
  }
}

export default stashReducer