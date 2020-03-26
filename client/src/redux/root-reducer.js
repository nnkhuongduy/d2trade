import { combineReducers } from 'redux';

import inventoryReducer from './inventory/inventory.reducer';
import tempItemReducer from './temp-item/temp-item.reducer';
import slotStateReducer from './slot-state/slot-state.reducer';
import clientStatesReducer from './client-states/client-states.reducer';
import searchingReducer from './searching/searching.reducer';

export default combineReducers({
  inventory: inventoryReducer,
  tempItem: tempItemReducer,
  slotState: slotStateReducer,
  clientStates: clientStatesReducer,
  searching: searchingReducer
});