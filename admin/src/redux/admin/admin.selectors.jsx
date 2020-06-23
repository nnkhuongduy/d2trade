import { createSelector } from 'reselect'

const selectAdminState = state => state.admin

export const selectAdmin = createSelector([selectAdminState], state => state.admin)

export const selectLoggingIn = createSelector([selectAdminState], state => state.isLoggingIn)