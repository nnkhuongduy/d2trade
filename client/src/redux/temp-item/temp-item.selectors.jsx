import { createSelector } from 'reselect';

export const selectTempItemState = state => state.tempItem;

export const selectBotTempItem = createSelector([selectTempItemState], stateTempItem => stateTempItem.tempItem.bot);

export const selectUserTempItem = createSelector([selectTempItemState], stateTempItem => stateTempItem.tempItem.user);

export const selectBotPricesUSD = createSelector([selectTempItemState], state => state.priceUSD.bot)

export const selectUserPricesUSD = createSelector([selectTempItemState], state => state.priceUSD.user)

export const selectBotPricesVND = createSelector([selectTempItemState], state => state.priceVND.bot)

export const selectUserPricesVND = createSelector([selectTempItemState], state => state.priceVND.user)

export const selectTradeButtonState = createSelector([selectBotPricesUSD, selectUserPricesUSD, selectBotPricesVND, selectUserPricesVND],
  (botPricesUSD, userPricesUSD, botPricesVND, userPricesVND) => {
    botPricesUSD = parseFloat(botPricesUSD)
    userPricesUSD = parseFloat(userPricesUSD)
    botPricesVND = parseInt(botPricesVND)
    userPricesVND = parseInt(userPricesVND)
    return (userPricesUSD >= botPricesUSD && userPricesVND >= botPricesVND && userPricesUSD !== 0 && userPricesVND !== 0)
  })