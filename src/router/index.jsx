import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import NotFound from '@/pages/404';
import PageLoading from '@/components/PageLoading';

import { Menus } from './config';

const MenuRoute = ({ title, path, component }) => (
  <Route key={title} path={path} component={component} />
);

MenuRoute.propTypes = {
  component: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const BaseRouters = () => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      <Redirect from="/" to={Menus[0].path} exact />

      {Menus.map((menu) => {
        return menu.component || menu.component === null
          ? MenuRoute(menu)
          : menu.subMenu.map((item) => MenuRoute(item));
      })}

      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default BaseRouters;
