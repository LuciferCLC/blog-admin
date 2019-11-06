import { fork } from 'redux-saga/effects';

import { watchGetAuth } from './auth';

// root saga
function* rootSaga() {
  yield fork(watchGetAuth);
}

export default rootSaga;
