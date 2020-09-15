import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { checkLogin } from '@/utils';

const AuthRoute = ({ Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return checkLogin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

AuthRoute.propTypes = {
  Component: PropTypes.node.isRequired,
  location: PropTypes.shape({}).isRequired
};

export default AuthRoute;
