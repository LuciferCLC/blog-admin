import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Avatar } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

export class HeaderRightContent extends PureComponent {
  static propTypes = {
    onMenuClick: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
      gravatar: PropTypes.string,
      username: PropTypes.string
    })
  };

  static defaultProps = {
    currentUser: { username: 'nolan', gravatar: '' }
  };

  render() {
    const { onMenuClick, currentUser } = this.props;

    const HeaderMenu = (
      <Menu className={styles.menu} onClick={onMenuClick}>
        <Menu.Item key="set">
          <SettingOutlined />
          <span>settings</span>
        </Menu.Item>
        <Menu.Item key="logout">
          <LogoutOutlined />
          <span>logout</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={HeaderMenu} className={styles.right}>
        <span>
          <Avatar size="small" src={currentUser.gravatar} alt="avatar" />
          <span className={styles.name}>{currentUser.username}</span>
        </span>
      </Dropdown>
    );
  }
}
