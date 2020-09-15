import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import styles from './index.module.scss';

// ant-design 没提供文字按钮，这在某些情况下使用
export const TextButton = ({ children, className, ...rest }) => {
  return (
    <Button
      type="primary"
      ghost
      className={`${className || ''} ${styles['button-text']}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

TextButton.propTypes = {
  className: PropTypes.string.isRequired
};
