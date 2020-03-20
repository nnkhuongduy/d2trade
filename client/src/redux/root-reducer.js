import { combineReducers } from 'redux';

import botInventoryReducer from './inventory/inventory.reducer';
import tempItemReducer from './temp-item/temp-item.reducer';
import slotStateReducer from './slot-state/slot-state.reducer';

export default combineReducers({
  botInventory: botInventoryReducer,
  tempItem: tempItemReducer,
  slotState: slotStateReducer,
});