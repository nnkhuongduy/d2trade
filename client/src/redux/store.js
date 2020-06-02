import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer.jsx';
import sagaReducer from './root-saga.jsx';

const sagaMiddleware = createSagaMiddleware();

const middleWares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleWares));

export const persistor = persistStore(store);

sagaMiddleware.run(sagaReducer);

export default { store, persistor };
