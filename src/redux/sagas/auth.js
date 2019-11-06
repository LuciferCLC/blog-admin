import { takeLatest, call, put } from 'redux-saga/effects';

import ax from './axios';

function* getAuth() {
  try {
    const { data } = yield call(ax.get, '/auth');
    if (data && data.code === 1) {
      yield put({ type: 'INIT_AUTH', payload: data });
    } else {
      const { message } = data;
      yield put({ type: 'FETCH_ERROR', err: message });
    }
  } catch (err) {
    yield put({ type: 'FETCH_ERROR', err });
  }
}

// wacther saga
export function* watchGetAuth() {
  yield takeLatest('GET_AUTH', getAuth);
}
