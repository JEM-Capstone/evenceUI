import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import expo from 'expo';
import {
  Test, SecondTest, Login, AllEvents, FetchEvent, Favorites, Profile,
} from './Components/index';
import { createStackNavigator } from 'react-navigation';


const EventStack = createStackNavigator({
  Main: {
    screen: AllEvents,
  },
  SingleEvent: {
    screen: FetchEvent,
  },
});

// static navigationOptions = {
//   header: null,
//   tabBarIcon: <Ionicons name="md-calendar" size={25} color="white" />,
//   tabBarColor: `#01b781`,
// }

const RootStack = createMaterialBottomTabNavigator(
  {
    Login: {
      screen: Login
    },
    SingleEvent: {
      screen: FetchEvent,
    },
    Events: {
      screen: EventStack,
      navigationOptions: {
        tabBarIcon: <Ionicons name="md-calendar" size={25} color="white" />,
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: <Ionicons name="ios-contact" size={25} color="white" />,
        tabBarColor: `#01875f`,
      }
    },
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        tabBarIcon: <Ionicons name="ios-heart" size={25} color="white" />,
        tabBarColor: `#e25a9e`,
      }
    },
  },
  {
    initialRouteName: `Events`, // this will change back to login
    shifting: true,
    order: [`Events`, `Favorites`, `Profile`],
    barStyle: { backgroundColor: `#01b781` },
  },
);

const client = new ApolloClient({
  uri: `http://localhost:8080/graphql`,
});


class App extends React.Component {
  render() {
    return (
    <ApolloProvider client={client}>
      <RootStack />
    </ApolloProvider>
    );
  }
}

export default App;
