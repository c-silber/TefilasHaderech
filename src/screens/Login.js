import React, { Component } from 'react';
import { StyleSheet, ScrollView, Button, TextInput, View } from 'react-native';
import { Container, Content, Form, Item, Input, Text } from 'native-base';

export default class Login extends Component {
  state = {
       email: '',
       emailError: false,
       password: '',
       passwordError: false,
       isLoggingIn: false,
   }

   handleInputChange = (field, value) => {
      const newState = {
        ...this.state,
        [field]: value,
      };
      this.setState(newState);
    };

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearEmail = () => {
      this._email.setNativeProps({text: ''});
      this.setState({message: ''});
    }

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

         return this.props.onLoginPress;
       };

    render() {
        return (
              <ScrollView style={styles.container}>
              <Form>
                  <Text style={styles.login}>Login</Text>
                  <Item error={this.state.emailError}>
                  <Input placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={value => this.handleInputChange('email', value)}
                            autoCapitalize="none"
                            autoCorrect={false}/>
                  </Item>
                  <Item error={this.state.passwordError}>
                  <Input placeholder='Password'
                            autoCapitalize="none"
                            onChangeText={value => this.handleInputChange('password', value)}
                            autoCorrect={false}
                            secureTextEntry/>
                  </Item>
                </Form>
                  <View style={{margin:7}} />
                  <Button color='#805E73' onPress={this.handleSubmit} title="Submit"/>
              </ScrollView>
            )
    }
}

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
