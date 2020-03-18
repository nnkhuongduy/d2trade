import { combineReducers } from 'redux';

import botInventoryReducer from './inventory/inventory.reducer';

export default combineReducers({
  botInventory: botInventoryReducer
});