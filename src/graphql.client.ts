import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from '@apollo/client/core';
import { provideApollo  } from 'apollo-angular';

const GRAPHQL_URI = 'http://localhost:8080/query'; // Your Go GraphQL endpoint

// HTTP link
const httpLink = new HttpLink({ uri: GRAPHQL_URI });

// Auth link (optional)
const authLink = new ApolloLink((operation, forward) => {
    let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || '';
  }
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return forward(operation);
});

// Combine links
const link = authLink.concat(httpLink);

// Apollo client instance
export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// Provider for standalone bootstrap
export const provideGraphQL = provideApollo(() => apolloClient);