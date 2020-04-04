import { ItemsImageTypes } from './items-image.types'

const INITIAL_STATE = {
  bot: null,
  user: null,
  hero: null
}

export const itemsImageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ItemsImageTypes.SET_ITEMS_IMAGE:
      return {
        ...state,
        [action.itemsType]: {
          ...state[action.itemsType],
          ...action.itemsImage
        }
      }

    default:
      return state
  }
}

export default itemsImageReducer