import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../styles';
import { SafeAreaView } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';

const eventQuery = gql`
  query User
`;




class Profile extends Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>This is where you see your profile</Text>
      </SafeAreaView>
    );
  }
}

export default Profile;
