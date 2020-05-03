import { createSelector } from 'reselect'

const selectSiteSettingsState = state => state.siteSettings

export const selectSiteSettings = createSelector([selectSiteSettingsState], state => state.settings)

export const selectCurrencyRate = createSelector([selectSiteSettings], settings => settings ? settings.currencyRate : null)