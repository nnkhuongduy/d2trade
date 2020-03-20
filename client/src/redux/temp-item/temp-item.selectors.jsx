import { createSelector } from 'reselect';

const selectStateTempItem = state => state.tempItem;

export const selectTempItem = createSelector([selectStateTempItem], stateTempItem => stateTempItem.tempItem);

export const selectTotalPricesBot = createSelector([selectTempItem], items => (
  items.reduce((accumulator, item) => (accumulator + parseFloat(item.item.market_price)), 0)
))