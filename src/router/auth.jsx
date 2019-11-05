import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { checkLogin } from '@/utils';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (checkLogin() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    ))}
  />
);

AuthRoute.propTypes = {
  component: PropTypes.node.isRequired,
  location: PropTypes.shape({}),
};

AuthRoute.defaultProps = {
  location: null,
};

export { AuthRoute };
