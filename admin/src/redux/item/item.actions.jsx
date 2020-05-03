import { ItemTypes } from './item.types'

export const fetchItemStart = itemName => ({
  type: ItemTypes.FETCH_ITEM_START,
  itemName: itemName
})

export const fetchItemSuccess = item => ({
  type: ItemTypes.FETCH_ITEM_SUCCESS,
  item: item
})

export const fetchItemFail = message => ({
  type: ItemTypes.FETCH_ITEM_FAIL,
  message: message
})

