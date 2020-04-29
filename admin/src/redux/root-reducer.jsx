import { combineReducers } from 'redux';

import currentPageReducer from './current-page/current-page.reducer'
import userReducer from './users/users.reducer'
import overlayReducer from './overlay/overlay.reducer'
import filterReducer from './filter/filter.reducer'

const rootReducer = combineReducers({
  currentPage: currentPageReducer,
  users: userReducer,
  overlay: overlayReducer,
  filter: filterReducer
});

export default rootReducer;