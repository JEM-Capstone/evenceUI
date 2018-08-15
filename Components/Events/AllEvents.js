import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Text, View, Button } from 'react-native';
import FetchAllEvents from './FetchAllEvents';
import styles from '../styles';
import { SafeAreaView } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';


const client = new ApolloClient({
  uri: `http://localhost:8080/graphql`,
});

class AllEvents extends Component {
  static navigationOptions = {
    header: null,
    // <Ionicons name="icon-name" size={20} color="#4F8EF7" />
    tabBarIcon: <Ionicons name="ios-alarm" size={20} color="green" />,
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <SafeAreaView style={styles.container}>
          <FetchAllEvents />
        </SafeAreaView>
      </ApolloProvider>
    );
  }
}

export default AllEvents;
