import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../styles';
import { SafeAreaView } from 'react-navigation';

class Favorites extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>This is the favorites component where you can see events you saved/favorited</Text>
      </SafeAreaView>
    );
  }
}

export default Favorites;
