import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Menu, Icon, Dropdown, Avatar
} from 'antd';

import styles from './index.module.scss';

class HeaderRightContent extends PureComponent {
  render() {
    const { onMenuClick, currentUser } = this.props;
    const HeaderMenu = (
      <Menu className={styles.menu} onClick={onMenuClick}>
        <Menu.Item key="set">
          <Icon type="setting" />
          <span>settings</span>
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
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

HeaderRightContent.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    gravatar: PropTypes.string,
  }).isRequired,
};

export { HeaderRightContent };
