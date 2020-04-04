import { ItemsImageTypes } from './items-image.types'

export const setItemsImage = (itemsType, itemsImage) => ({
  type: ItemsImageTypes.SET_ITEMS_IMAGE,
  itemsType: itemsType,
  itemsImage: itemsImage
})