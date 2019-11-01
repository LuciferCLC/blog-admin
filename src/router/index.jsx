import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { NotFound } from '@/pages/404';
import { PageLoading } from '@/components/PageLoading';

import { Menus } from './config';

export const BaseRouters = () => (
  <Suspense fallback={<PageLoading />}>
    <Switch>
      <Redirect from="/" to={Menus[0].path} exact />

      {Menus.map((menu) => {
        const route = ({ component: Component, path, title }) => (
          <Route key={title} path={path} component={Component} />
        );
        return menu.component
          ? route(menu)
          : menu.subMenu.map((item) => route(item));
      })}

      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

// BaseRouters.propTypes = {
//   component: PropTypes.node.isRequired,
//   path: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
// };
