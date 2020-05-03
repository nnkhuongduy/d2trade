import { SiteSettingsTypes } from './site-settings.types'

export const fetchSiteSettingsStart = () => ({
  type: SiteSettingsTypes.FETCH_SITE_SETTINGS_START
})

export const fetchSiteSettingsSuccess = settings => ({
  type: SiteSettingsTypes.FETCH_SITE_SETTINGS_SUCCESS,
  settings: settings
})

export const fetchSiteSettingsFail = message => ({
  type: SiteSettingsTypes.FETCH_SITE_SETTINGS_FAIL,
  message: message
})

export const fetchCurrencyRateStart = () => ({
  type: SiteSettingsTypes.FETCH_CURRENCY_RATE_START
})

export const fetchCurrencyRateSuccess = rate => ({
  type: SiteSettingsTypes.FETCH_CURRENCY_RATE_SUCCESS,
  rate: rate
})

export const fetchCurrencyRateFail = message => ({
  type: SiteSettingsTypes.FETCH_CURRENCY_RATE_FAIL,
  message: message
})