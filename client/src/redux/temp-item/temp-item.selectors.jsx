import { createSelector } from 'reselect';

export const selectStateTempItem = state => state.tempItem;

export const selectBotTempItem = createSelector([selectStateTempItem], stateTempItem => stateTempItem.botTempItem);

export const selectUserTempItem = createSelector([selectStateTempItem], stateTempItem => stateTempItem.userTempItem);

export const selectTotalPricesBot = createSelector([selectBotTempItem], items => (
  items.reduce((accumulator, item) => (accumulator + parseFloat(item.item.market_price)), 0)
))

export const selectTotalPricesUser = createSelector([selectUserTempItem], items => (
  items.reduce((accumulator, item) => (accumulator + parseFloat(item.item.market_price)), 0)
))
