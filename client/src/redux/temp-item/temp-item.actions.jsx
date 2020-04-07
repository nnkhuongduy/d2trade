import { TempItemTypes } from './temp-item.types';

export const setTempItem = (tempType, item) => ({
  type: TempItemTypes.SET_TEMP_ITEM,
  tempType: tempType,
  item: item
})

export const unsetTempItem = (tempType, item) => ({
  type: TempItemTypes.UNSET_TEMP_ITEM,
  tempType: tempType,
  item: item
})

export const refreshTempItems = tempType => ({
  type: TempItemTypes.REFRESH_TEMP_ITEMS,
  tempType: tempType
})

export const updatePrice = (priceType, priceVND, priceUSD) => ({
  type: TempItemTypes.UPDATE_PRICE,
  priceType: priceType,
  priceVND: priceVND,
  priceUSD: priceUSD
})
