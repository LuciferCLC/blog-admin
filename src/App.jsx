import React, { PureComponent, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { PageLoading } from './components/PageLoading';
import { AuthRoute } from './router/auth';
import Login from './pages/Login';
import BaseLayout from './layouts/BaseLayout';

import './App.css';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
          <Switch>
            <Route path="/login" exact component={Login} />
            <AuthRoute path="/" component={BaseLayout} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
