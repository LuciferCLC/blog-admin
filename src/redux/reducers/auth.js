import { handleActions } from 'redux-actions';
import { initAuth } from '../actions/auth';

const initialState = {};
const authReducer = handleActions({
  [initAuth]: (state, { payload }) => {
    console.log(payload);
    return {
      ...state,
    };
  },
}, initialState);

export { authReducer };
