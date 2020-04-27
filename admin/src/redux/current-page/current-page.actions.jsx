import { CurrentPageTypes } from './current-page.types'

export const setCurrentPage = page => ({
  type: CurrentPageTypes.SET_CURRENT_PAGE,
  page: page
})