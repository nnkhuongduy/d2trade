import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import inventoryReducer from './inventory/inventory.reducer';
import tempItemReducer from './temp-item/temp-item.reducer';
import slotStateReducer from './slot-state/slot-state.reducer';
import clientStatesReducer from './client-states/client-states.reducer';
import searchingReducer from './searching/searching.reducer';
import heroesReducer from './heroes/heroes.reducer';
import priceFilterReducer from './price-filter/price-filter.reducer';
import userReducer from './user/user.reducer';
import itemsImageReducer from './items-image/items-image.reducer'
import currencyReducer from './currency/currency.reducer'
import rarityFilterReducer from './rarity-filter/rarity-filter.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  tempItem: tempItemReducer,
  slotState: slotStateReducer,
  clientStates: clientStatesReducer,
  searching: searchingReducer,
  heroes: heroesReducer,
  priceFilter: priceFilterReducer,
  user: userReducer,
  itemsImage: itemsImageReducer,
  currency: currencyReducer,
  rarityFilter: rarityFilterReducer
});

export default persistReducer(persistConfig, rootReducer);