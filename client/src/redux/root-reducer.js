import { combineReducers } from 'redux';

import inventoryReducer from './inventory/inventory.reducer';
import tempItemReducer from './temp-item/temp-item.reducer';
import slotStateReducer from './slot-state/slot-state.reducer';
import clientStatesReducer from './client-states/client-states.reducer';
import searchingReducer from './searching/searching.reducer';
import heroesReducer from './heroes/heroes.reducer';
import priceFilterReducer from './price-filter/price-filter.reducer';
import userReducer from './user/user.reducer';

export default combineReducers({
  inventory: inventoryReducer,
  tempItem: tempItemReducer,
  slotState: slotStateReducer,
  clientStates: clientStatesReducer,
  searching: searchingReducer,
  heroes: heroesReducer,
  priceFilter: priceFilterReducer,
  user: userReducer
});