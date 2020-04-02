import { createSelector } from 'reselect';

export const selectTempItemState = state => state.tempItem;

export const selectBotTempItem = createSelector([selectTempItemState], stateTempItem => stateTempItem.tempItem.bot);

export const selectUserTempItem = createSelector([selectTempItemState], stateTempItem => stateTempItem.tempItem.user);

export const selectTotalPricesBot = createSelector([selectBotTempItem], items => (
  items.reduce((accumulator, item) => (accumulator + parseFloat(item.market_price)), 0)
))

export const selectTotalPricesUser = createSelector([selectUserTempItem], items => (
  items.reduce((accumulator, item) => (accumulator + parseFloat(item.market_price)), 0)
))

export const selectTradeButtonState = createSelector([selectTotalPricesBot, selectTotalPricesUser], (botPrices, userPrices) => (
  userPrices >= botPrices && userPrices !== 0
))