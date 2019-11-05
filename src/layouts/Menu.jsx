import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu as AntMenu, Icon } from 'antd';

const renderMenuItem = (item) => (
  <AntMenu.Item key={item.path}>
    <Link to={item.redirect || item.path}>
      {item.icon && <Icon type={item.icon} />}
      <span className="nav-text">{item.title}</span>
    </Link>
  </AntMenu.Item>
);

const renderSubMenu = (item) => (
  <AntMenu.SubMenu
    key={item.path}
    title={(
      <span>
        {item.icon && <Icon type={item.icon} />}
        <span className="nav-text">{item.title}</span>
      </span>
    )}
  >
    {item.subMenu && item.subMenu.map((subItem) => renderMenuItem(subItem))}
  </AntMenu.SubMenu>
);

export const BaseMenu = ({ menu, ...props }) => (
  <AntMenu {...props}>
    {menu.map((item) => (
      item.subMenu ? renderSubMenu(item) : renderMenuItem(item)
    ))}
  </AntMenu>
);

BaseMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    subMenu: PropTypes.arrayOf(PropTypes.shape({})),
  })).isRequired,
};
