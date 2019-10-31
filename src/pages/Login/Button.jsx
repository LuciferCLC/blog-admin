import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const LoginButton = ({ login, ...props }) => (
  <Button {...props} onClick={login}>
    Login
  </Button>
);

LoginButton.propTypes = {
  login: PropTypes.func.isRequired,
};

export { LoginButton };
