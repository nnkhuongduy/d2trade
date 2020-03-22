import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import sagaReducer from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middleWares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middleWares));

sagaMiddleware.run(sagaReducer);

export default store;
