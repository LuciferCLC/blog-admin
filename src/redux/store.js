import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as reducer from './reducers/index';
import rootSagas from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(
  reducer.authReducer,
  applyMiddleware(sagaMiddleware)
);

// then run the saga
sagaMiddleware.run(rootSagas);

export default store;
