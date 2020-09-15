import { notification } from 'antd';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

const httpLink = new BatchHttpLink({
  uri: process.env.REACT_APP_APOLLO_PATH
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

    notification.error({
      message: 'GraphQL error',
      description:
        (graphQLErrors[0].message && graphQLErrors[0].message.message) ||
        graphQLErrors[0].message ||
        '未知错误',
      duration: 5
    });
  } else if (networkError) {
    notification.error({
      message: 'Network error',
      description: networkError.message,
      duration: 5
    });
  }
});

const authLink = setContext((_, { headers }) => {
  const store = JSON.parse(window.localStorage.getItem('TOKEN') || '{}');
  return {
    headers: {
      ...headers,
      authorization: store.token ? `Bearer ${store.token}` : ''
    }
  };
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    dataIdFromObject: (object) => object._id || object.id
  })
});
