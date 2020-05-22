import { createSelector } from 'reselect'

const selectSiteConfigsState = state => state.configs

export const selectSiteConfigs = createSelector([selectSiteConfigsState], state => state.configs)

export const selectCurrencyRate = createSelector([selectSiteConfigs], configs => configs ? configs.find(config => config.name === 'currencyRate').value : null)

export const selectHandling = createSelector([selectSiteConfigsState], state => state.isHandling)