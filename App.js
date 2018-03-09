/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import {
  ApolloClient,
  HttpLink,
  InMemoryCache
} from 'apollo-client-preset';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Register from './src/screens/Register'
import Login from './src/screens/Login'
import Profile from './src/screens/Profile'

const client = new ApolloClient({
  link: new HttpLink({uri: 'https://zr9r0p0547.lp.gql.zone/graphql'}),
  cache: new InMemoryCache()
});

type Props = {};
export default class App extends Component<Props> {
  state = {
     isLoggedIn: false
   }

   render() {
     if (this.state.isLoggedIn)
       return <Profile
           onLogoutPress={() => this.setState({isLoggedIn: false})}
         />;
     else
       return <Login
           onLoginPress={() => this.setState({isLoggedIn: true})}
         />;
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
