import { combineReducers } from 'redux';

import currentPageReducer from './current-page/current-page.reducer'
import userReducer from './users/users.reducer'

const rootReducer = combineReducers({
  currentPage: currentPageReducer,
  users: userReducer
});

export default rootReducer;