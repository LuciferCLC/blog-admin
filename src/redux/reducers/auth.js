import { handleAction } from 'redux-actions';
import { login } from '../actions/auth';

const IntitalizeValue = {};
const authReducer = handleAction(
  [login],
  (state, { payload = {} }) => ({
    login: payload.result,
  }),
  IntitalizeValue
);

export { authReducer };
