import { TempItemTypes } from './temp-item.types';

export const setBotTempItem = item => ({
  type: TempItemTypes.SET_BOT_TEMP_ITEM,
  payload: item
})

export const unsetBotTempItem = item => ({
  type: TempItemTypes.UNSET_BOT_TEMP_ITEM,
  payload: item
})

export const setUserTempItem = item => ({
  type: TempItemTypes.SET_USER_TEMP_ITEM,
  payload: item
})

export const unsetUserTempItem = item => ({
  type: TempItemTypes.UNSET_USER_TEMP_ITEM,
  payload: item
})

export const refreshBotTempItems = () => ({
  type: TempItemTypes.REFRESH_BOT_TEMP_ITEMS,
})

export const refreshUserTempItems = () => ({
  type: TempItemTypes.REFRESH_USER_TEMP_ITEMS,
})