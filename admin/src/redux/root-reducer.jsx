import { combineReducers } from 'redux';

import userReducer from './users/users.reducer'
import overlayReducer from './overlay/overlay.reducer'
import filterReducer from './filter/filter.reducer'

const rootReducer = combineReducers({
  users: userReducer,
  overlay: overlayReducer,
  filter: filterReducer
});

export default rootReducer;