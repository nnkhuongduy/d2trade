import { createSelector } from 'reselect'

const selectUsersState = state => state.users

export const selectUsers = createSelector([selectUsersState], state => state.users)

export const selectUsersFetching = createSelector([selectUsersState], state => state.isFetching)

export const selectBalanceSetting = createSelector([selectUsersState], state => state.isBalanceSetting)