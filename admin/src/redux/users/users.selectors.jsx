import { createSelector } from 'reselect'

const selectUsersState = state => state.users

export const selectUsers = createSelector([selectUsersState], state => state.users)

export const selectBalanceSetting = createSelector([selectUsersState], state => state.isBalanceSetting)

export const selectBalanceSetState = createSelector([selectUsersState], state => state.balanceSetState)