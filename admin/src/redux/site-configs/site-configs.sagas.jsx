import { all, takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import {
  fetchSiteConfigsSuccess, fetchSiteConfigsFail,
  putSiteConfigSuccess, putSiteConfigFail
} from './site-configs.actions'
import { enqSnackbar } from '../snackbar/snackbar.actions'

import { SiteConfigsTypes } from './site-configs.types'

function* fetchSiteConfigsAsync() {
  try {
    const respone = yield axios('/admin/configs')

    if (respone.status === 200) {
      yield put(fetchSiteConfigsSuccess(respone.data))
    }
    else yield put(fetchSiteConfigsFail(respone.statusText))
  } catch (err) {
    yield put(fetchSiteConfigsFail(err.message))
  }
}

function* putSiteConfigAsync({ config }) {
  try {
    const respone = yield axios.put('/admin/configs', config)

    if (respone.status === 200) {
      yield put(putSiteConfigSuccess(respone.data))
      yield put(enqSnackbar({
        severity: 'success',
        text: 'Sửa thiết lập thành công!',
        key: new Date().getTime()
      }))
    }
    else {
      yield put(putSiteConfigFail(respone.statusText))
      yield put(enqSnackbar({
        severity: 'error',
        text: 'Sửa thiết lập thất bại!',
        key: new Date().getTime()
      }))
    }
  } catch (err) {
    yield put(putSiteConfigFail(err.message))
    yield put(enqSnackbar({
      severity: 'error',
      text: 'Sửa thiết lập thất bại!',
      key: new Date().getTime()
    }))
  }
}

export function* siteConfigsRootSaga() {
  yield all([
    takeLatest(SiteConfigsTypes.FETCH_SITE_CONFIGS_START, fetchSiteConfigsAsync),
    takeLatest(SiteConfigsTypes.PUT_SITE_CONFIG_START, putSiteConfigAsync)
  ])
}