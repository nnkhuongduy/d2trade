import { TempItemTypes } from './temp-item.types';

export const setTempItem = item => ({
  type: TempItemTypes.SET_TEMP_ITEM,
  payload: item
})

export const unsetTempItem = item => ({
  type: TempItemTypes.UNSET_TEMP_ITEM,
  payload: item
})