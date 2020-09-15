import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { HeaderRightContent } from './HeaderRightContent';

import styles from './index.module.scss';

const { Header: AntHeader } = Layout;

export const Header = ({ collapsed, toggle, ...rest }) => {
  const Icon = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;

  return (
    <AntHeader className={styles.header}>
      <Icon className={styles.trigger} onClick={toggle} />

      <HeaderRightContent {...rest} />
    </AntHeader>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};
