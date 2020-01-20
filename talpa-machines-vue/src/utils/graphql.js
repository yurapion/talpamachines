// src/utils/graphql.js
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import "cross-fetch/polyfill";

export default new ApolloClient({
  // Provide the URL to the API server.
  link: new HttpLink({ uri: "http://localhost:4000" }),
  // Using a cache for blazingly
  // fast subsequent queries.
  cache: new InMemoryCache()
});
