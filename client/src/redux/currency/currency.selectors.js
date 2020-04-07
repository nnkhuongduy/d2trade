import { createSelector } from 'reselect'

const selectCurrencyStore = state => state.currency;

export const selectCurrencyState = createSelector([selectCurrencyStore], state => state.currency)

export const selectCurrencyRate = createSelector([selectCurrencyStore], state => state.currencyRate)