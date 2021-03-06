import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import styles from './index.module.scss';

export const BreadcrumbView = withRouter((props) => {
  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  return (
    <Breadcrumb className={styles['ant-breadcrumb']}>
      <Breadcrumb.Item>
        <Link to="/dashboard">
          <span>首页</span>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span>{pathSnippets}</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
});
