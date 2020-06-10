import { combineReducers } from 'redux';

import userReducer from './users/users.reducer'
import overlayReducer from './overlay/overlay.reducer'
import filterReducer from './filter/filter.reducer'
import itemReducer from './item/item.reducer'
import siteConfigsReducer from './site-configs/site-configs.reducer'
import heroReducer from './hero/hero.reducer'
import backdropReducer from './backdrop/backdrop.reducer'
import snackbarReducer from './snackbar/snackbar.reducer'
import offersReducer from './offers/offers.reducer'
import receiptsReducer from './receipts/receipts.reducer'

const rootReducer = combineReducers({
  users: userReducer,
  overlay: overlayReducer,
  filter: filterReducer,
  item: itemReducer,
  configs: siteConfigsReducer,
  hero: heroReducer,
  backdrop: backdropReducer,
  snackbar: snackbarReducer,
  offers: offersReducer,
  receipts: receiptsReducer
});

export default rootReducer;