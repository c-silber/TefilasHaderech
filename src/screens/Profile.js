import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Button
} from 'react-native';

export default class Profile extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text
                    style={styles.welcome}>
                    Welcome
                </Text>
                <View style={{margin:20}} />
                <Button     color='#805E73'
                            onPress={this.props.onLogoutPress}
                            title="Logout"
                     />
                </ScrollView>
                )
    }
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 27,
    textAlign: 'center',
    margin: 10,
  }
});
