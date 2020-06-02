import { StashTypes } from './stash.types'

const INITIAL_STATE = {
  stash: {
    bot: [],
    user: []
  }
}

const stashReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StashTypes.UPDATE_STASH_FINISH:
      return {
        ...state,
        stash: {
          ...state.stash,
          [action.inventoryType]: action.stash
        }
      }

    default:
      return state
  }
}

export default stashReducer