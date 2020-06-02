import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import inventoryReducer from './inventory/inventory.reducer';
import userReducer from './user/user.reducer';
import heroesReducer from './heroes/heroes.reducer';
import stashReducer from './stash/stash.reducer';
import offerReducer from './offer/offer.reducer';
import backdropReducer from './backdrop/backdrop.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  user: userReducer,
  heroes: heroesReducer,
  stash: stashReducer,
  offer: offerReducer,
  backdrop: backdropReducer
});

export default persistReducer(persistConfig, rootReducer);