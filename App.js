import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.15
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'; // 1.0.1
import { ApolloProvider } from 'react-apollo'; // 2.0.0
import { setContext } from 'apollo-link-context'; // 1.0.0

import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';

import "apollo-client"; // 2.0.1
import "apollo-link"; // 1.0.0

import { signIn, signOut, getToken } from './src/security/util';

import "graphql"; // 0.11.7

const httpLink = new HttpLink({ uri: 'https://zr9r0p0547.lp.gql.zone/graphql' });
const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();

  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const AuthStack = StackNavigator({
  Register: { screen: Register, navigationOptions: { headerTitle: 'Register' } },
  Login: { screen: Login, navigationOptions: { headerTitle: 'Login' } },
});

const LoggedInStack = StackNavigator({
  Profile: { screen: Profile, navigationOptions: { headerTitle: 'Profile' } },
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  async componentWillMount() {
    const token = await getToken();
    if (token) {
      this.setState({ loggedIn: true });
    }
  }

  handleChangeLoginState = (loggedIn = false, jwt) => {
    this.setState({ loggedIn });
    if (loggedIn) {
      signIn(jwt);
    } else {
      signOut();
    }
  };

  render() {
    return (
      <ApolloProvider client={client}>
        {this.state.loggedIn ?
          <LoggedInStack screenProps={{ changeLoginState: this.handleChangeLoginState }} /> :
          <AuthStack screenProps={{ changeLoginState: this.handleChangeLoginState }} />}
      </ApolloProvider>
    );
  }
}
