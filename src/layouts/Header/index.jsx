import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';

import { HeaderRightContent } from './HeaderRightContent';

import styles from './index.module.scss';

const { Header: AntHeader } = Layout;

export const Header = ({ collapsed, toggle, ...rest }) => (
  <AntHeader className={styles.header}>
    <Icon
      className={styles.trigger}
      type={collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={toggle}
    />

    <HeaderRightContent {...rest} />
  </AntHeader>
);

Header.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
