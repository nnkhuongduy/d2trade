import { SiteConfigsTypes } from './site-configs.types'

const INITIAL_STATE = {
  configs: null,
  isHandling: false,
  message: null
}

const siteConfigsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SiteConfigsTypes.FETCH_SITE_CONFIGS_START:
      return {
        ...state,
        isHandling: true,
        message: null
      }

    case SiteConfigsTypes.FETCH_SITE_CONFIGS_SUCCESS:
      return {
        ...state,
        configs: action.configs,
        isHandling: false
      }

    case SiteConfigsTypes.FETCH_SITE_CONFIGS_FAIL:
      return {
        ...state,
        isHandling: false,
        message: action.message
      }

    case SiteConfigsTypes.PUT_SITE_CONFIG_START:
      return {
        ...state,
        isHandling: true,
        message: null
      }

    case SiteConfigsTypes.PUT_SITE_CONFIG_SUCCESS:
      return {
        ...state,
        isHandling: false
      }

    case SiteConfigsTypes.PUT_SITE_CONFIG_FAIL:
      return {
        ...state,
        isHandling: false,
        message: action.message
      }

    default:
      return state
  }
}

export default siteConfigsReducer