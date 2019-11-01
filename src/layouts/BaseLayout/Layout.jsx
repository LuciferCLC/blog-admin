import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import { Header } from '../Header';
import { BaseMenu } from '../Menu';
import { BaseRouters } from '@/router';
import { Menus } from '@/router/config';
import { urlToList } from '@/utils';
import { BreadcrumbView } from '@/components/Breadcrumb';
import logo from '@/assets/images/logo.png';

import styles from './index.module.scss';

const { Sider, Content } = Layout;

class PageLayout extends PureComponent {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState((state) => ({
      collapsed: !state.collapsed,
    }));
  };

  handleMenuClick = ({ key }) => {
    const { history, location } = this.props;

    if (key === 'set') {
      history.push('/settings/options');
    } else {
      window.localStorage.setItem('TOKEN', JSON.stringify('{}'));
      history.push('/login', {
        from: location,
      });
    }
  };

  render() {
    const { location: { pathname }, useInfo } = this.props;
    const { collapsed } = this.state;
    const openKeys = urlToList(pathname)[0];
    const props = { selectedKeys: [pathname, openKeys] };
    // menu  默认两级 route
    if (openKeys !== pathname) {
      props.openKeys = [openKeys];
    }

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: 'auto',
            height: '100vh',
          }}
        >
          <div className={styles.logo}>
            <img src={logo} alt="" />
            {!collapsed && <span>后台管理</span>}
          </div>
          <BaseMenu menu={Menus} theme="dark" mode="inline" {...props} />
        </Sider>
        <Layout>
          <Header
            collapsed={collapsed}
            toggle={this.toggle}
            currentUser={useInfo && useInfo.getInfo}
            onMenuClick={this.handleMenuClick}
          />
          <BreadcrumbView />
          <Content className={styles.content}>
            <BaseRouters />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

PageLayout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  useInfo: PropTypes.shape({
    getInfo: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      username: PropTypes.string,
      password: PropTypes.string,
      slogan: PropTypes.string,
      gravatar: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export const ContentLayout = withRouter(PageLayout);
