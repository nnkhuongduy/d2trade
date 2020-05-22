import { SiteConfigsTypes } from './site-configs.types'

export const fetchSiteConfigsStart = () => ({
  type: SiteConfigsTypes.FETCH_SITE_CONFIGS_START
})

export const fetchSiteConfigsSuccess = configs => ({
  type: SiteConfigsTypes.FETCH_SITE_CONFIGS_SUCCESS,
  configs: configs
})

export const fetchSiteConfigsFail = message => ({
  type: SiteConfigsTypes.FETCH_SITE_CONFIGS_FAIL,
  message: message
})

export const putSiteConfigStart = config => ({
  type: SiteConfigsTypes.PUT_SITE_CONFIG_START,
  config: config
})

export const putSiteConfigSuccess = () => ({
  type: SiteConfigsTypes.PUT_SITE_CONFIG_SUCCESS
})

export const putSiteConfigFail = message => ({
  type: SiteConfigsTypes.PUT_SITE_CONFIG_FAIL,
  message: message
})