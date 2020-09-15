import React, { PureComponent, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { notification } from 'antd';
import { ApolloProvider } from '@apollo/client';

import Login from './pages/Login';
import BaseLayout from './layouts/BaseLayout';
import PageLoading from './components/PageLoading';
import AuthRoute from './router/auth';
import { client } from './plugin/apollo';

import './App.css';

class App extends PureComponent {
  componentDidCatch(error, info) {
    notification.error({
      description: info.componentStack,
      duration: 5,
      message: 'something was error'
    });
  }

  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Suspense fallback={<PageLoading />}>
            <Switch>
              <Route path="/login" exact component={Login} />
              <AuthRoute path="/" component={BaseLayout} />
            </Switch>
          </Suspense>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
