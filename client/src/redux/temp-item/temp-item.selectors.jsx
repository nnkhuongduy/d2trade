import { createSelector } from 'reselect';

export const selectTempItemState = state => state.tempItem;

export const selectBotTempItem = createSelector([selectTempItemState], stateTempItem => stateTempItem.tempItem.bot);

export const selectUserTempItem = createSelector([selectTempItemState], stateTempItem => stateTempItem.tempItem.user);

export const selectBotPrices = createSelector([selectTempItemState], state => state.price.bot)

export const selectUserPrices = createSelector([selectTempItemState], state => state.price.user)

export const selectTradeButtonState = createSelector([selectBotPrices, selectUserPrices], (botPrices, userPrices) => {
  botPrices = parseFloat(botPrices)
  userPrices = parseFloat(userPrices)
  return (userPrices >= botPrices && userPrices !== 0)
})