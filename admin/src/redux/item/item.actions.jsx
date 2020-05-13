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

export const postItemStart = item => ({
  type: ItemTypes.POST_ITEM_START,
  item: item
})

export const postItemSuccess = () => ({
  type: ItemTypes.POST_ITEM_SUCCESS
})

export const postItemFail = message => ({
  type: ItemTypes.POST_ITEM_FAIL,
  message: message
})

export const fetchItemsStart = () => ({
  type: ItemTypes.FETCH_ITEMS_START,
})

export const fetchItemsSuccess = items => ({
  type: ItemTypes.FETCH_ITEMS_SUCCESS,
  items: items
})

export const fetchItemsFail = message => ({
  type: ItemTypes.FETCH_ITEMS_FAIL,
  message: message
})