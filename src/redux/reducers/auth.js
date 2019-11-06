import { handleActions } from 'redux-actions';
import { initAuth } from '../actions/auth';

const initialState = {};
const authReducer = handleActions({
  [initAuth]: (state, { payload }) => ({
    ...state,
    auth: payload.result,
  }),
}, initialState);

export { authReducer };
