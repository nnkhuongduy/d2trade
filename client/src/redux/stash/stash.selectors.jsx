import { createSelector } from 'reselect'

const selectStash = state => state.stash

export const selectBotStash = createSelector([selectStash], state => state.stash.bot)

export const selectUserStash = createSelector([selectStash], state => state.stash.user)

export const selectBotTotal = createSelector([selectBotStash], stash => stash.reduce(((accumulator, item) => accumulator += item.prices.vnd), 0))

export const selectUserTotal = createSelector([selectUserStash], stash => stash
  .filter(item => item.assetId !== 'moneyItem')
  .reduce(((accumulator, item) => accumulator += item.prices.vnd), 0))

export const selectUserBalance = createSelector([selectUserStash], stash =>
  Boolean(stash.filter(item => item.assetId === 'moneyItem').length) ? stash.find(item => item.assetId === 'moneyItem').prices.vnd : 0
)

export const selectDiff = createSelector([selectBotTotal, selectUserTotal], (bot, user) => (bot - user))

export const selectUserTotalwMoney = createSelector([selectUserTotal, selectUserBalance], (total, balance) => total + balance)

export const selectTradeable = createSelector([selectBotTotal, selectUserTotalwMoney], (bot, user) => user >= bot && user !== 0 && bot !== 0)