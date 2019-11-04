import { handleAction } from 'redux-actions';
import { login } from '../actions/auth';

const IntitalizeValue = {};
const authReducer = handleAction(
  [login],
  (state) => ({
    login: state.login,
  }),
  IntitalizeValue
);

export { authReducer };
