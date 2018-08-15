import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../styles';
import { SafeAreaView } from 'react-navigation';

class Profile extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>This is where you see your profile</Text>
      </SafeAreaView>
    );
  }
}

export default Profile;
