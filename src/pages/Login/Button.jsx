import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

export const LoginButton = ({ login, ...props }) => (
  <Button {...props} onClick={login}>
    Login
  </Button>
);

LoginButton.propTypes = {
  login: PropTypes.func.isRequired
};
