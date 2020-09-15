import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu as AntMenu } from 'antd';

const renderMenuItem = ({ path, redirect, icon: Icon, title }) => (
  <AntMenu.Item key={path}>
    <Link to={redirect || path}>
      {Icon && <Icon />}
      <span className="nav-text">{title}</span>
    </Link>
  </AntMenu.Item>
);

renderMenuItem.propTypes = {
  path: PropTypes.string.isRequired,
  redirect: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

const renderSubMenu = ({ path, icon: Icon, title, subMenu = [] }) => (
  <AntMenu.SubMenu
    key={path}
    title={
      <span>
        {Icon && <Icon />}
        <span className="nav-text">{title}</span>
      </span>
    }
  >
    {subMenu.map((item) => renderMenuItem(item))}
  </AntMenu.SubMenu>
);

renderSubMenu.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export const BaseMenu = ({ menu, ...props }) => (
  <AntMenu {...props}>
    {menu.map((item) =>
      item.subMenu ? renderSubMenu(item) : renderMenuItem(item)
    )}
  </AntMenu>
);

BaseMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
