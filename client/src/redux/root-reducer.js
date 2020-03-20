import { combineReducers } from 'redux';

import inventoryReducer from './inventory/inventory.reducer';
import tempItemReducer from './temp-item/temp-item.reducer';
import slotStateReducer from './slot-state/slot-state.reducer';

export default combineReducers({
  inventory: inventoryReducer,
  tempItem: tempItemReducer,
  slotState: slotStateReducer,
});