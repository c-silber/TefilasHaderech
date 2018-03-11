import React, { Component } from 'react';
import { StyleSheet, ScrollView, Button, TextInput, View } from 'react-native';
import { Container, Content, Form, Item, Input, Text } from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
    };
  }

  handleInputChange = (field, value) => {
    const newState = {
      ...this.state,
      [field]: value,
    };
    this.setState(newState);
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    if (email.length === 0) {
      return this.setState({ emailError: true });
    }
    this.setState({ emailError: false });

    if (password.length === 0) {
      return this.setState({ passwordError: true });
    }
    this.setState({ passwordError: false });

    this.props
    .login(email, password)
    .then(({ data }) => {
      return this.props.screenProps.changeLoginState(true, data.login.jwt);
    })
    .catch(e => {
      // If the error message contains email or password we'll assume that's the error.
      if (/email/i.test(e.message)) {
        this.setState({ emailError: true });
      }
      if (/password/i.test(e.message)) {
        this.setState({ passwordError: true });
      }
    });

    return this.props.screenProps.changeLoginState(true);
  };

    render() {
      const { navigation } = this.props;
      const { emailError, passwordError } = this.state;

        return (
              <ScrollView style={styles.container}>
              <Form>
                  <Text style={styles.login}>Login</Text>
                  <Item error={emailError}>
                  <Input placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={value => this.handleInputChange('email', value)}
                            autoCapitalize="none"
                            autoCorrect={false}/>
                  </Item>
                  <Item error={passwordError}>
                  <Input placeholder='Password'
                            autoCapitalize="none"
                            onChangeText={value => this.handleInputChange('password', value)}
                            autoCorrect={false}
                            secureTextEntry/>
                  </Item>
                </Form>
                  <View style={{margin:7}} />
                  <Button color='#805E73' onPress={this.handleSubmit} title="Sign In"/>
                  <View style={{margin:7}} />
                  <Button color='#805E73' onPress={() => navigation.navigate('Register')} title="Register" />
              </ScrollView>
            )
    }
}

export default graphql(
  gql`
    mutation LogIn($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        _id
        email
        jwt
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      login: (email, password) => mutate({ variables: { email, password } }),
    }),
  },
)(Login);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  login: {
    fontSize: 27,
    textAlign: 'center',
    margin: 10,
  }
});
