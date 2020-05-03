import { SiteSettingsTypes } from './site-settings.types'

const INITIAL_STATE = {
  settings: null,
  isFetching: false,
  errorMessage: null
}

const siteSettingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SiteSettingsTypes.FETCH_SITE_SETTINGS_START:
      return {
        ...state,
        settings: null,
        isFetching: true,
        errorMessage: null
      }

    case SiteSettingsTypes.FETCH_SITE_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.settings,
        isFetching: false
      }

    case SiteSettingsTypes.FETCH_SITE_SETTINGS_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      }

    case SiteSettingsTypes.FETCH_CURRENCY_RATE_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null
      }

    case SiteSettingsTypes.FETCH_CURRENCY_RATE_SUCCESS:
      return {
        ...state,
        settings: {
          ...state.settings,
          currencyRate: action.rate
        },
        isFetching: false
      }

    case SiteSettingsTypes.FETCH_CURRENCY_RATE_FAIL:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      }

    default:
      return state
  }
}

export default siteSettingsReducer