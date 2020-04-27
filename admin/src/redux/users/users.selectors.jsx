import { createSelector } from 'reselect'

const selectUsersState = state => state.users

export const selectUsers = createSelector([selectUsersState], state => state.users)