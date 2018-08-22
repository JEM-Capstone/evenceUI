import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import expo from 'expo';
import {
  Test,
  SecondTest,
  Login,
  AllEvents,
  FetchEvent,
  Favorites,
  Profile,
} from './Components/index';
import { createStackNavigator } from 'react-navigation';

const EventStack = createStackNavigator({
  Main: {
    screen: AllEvents,
    navigationOptions: {
      header: null,
    },
  },
  SingleEvent: {
    screen: FetchEvent,
  },
});

const FavoriteStack = createStackNavigator({
  Main: {
    screen: Favorites,
    navigationOptions: {
      title: `Favorited Events`,
    },
  },
  SingleEvent: {
    screen: FetchEvent,
  },
});

const RootStack = createMaterialBottomTabNavigator(
  {
    Login: {
      screen: Login,
    },
    SingleEvent: {
      screen: FetchEvent,
    },
    Events: {
      screen: EventStack,
      navigationOptions: {
        tabBarIcon: <Ionicons name="md-calendar" size={25} color="white" />,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: <Ionicons name="ios-contact" size={25} color="white" />,
        tabBarColor: `#0e4eb5`,
      },
    },
    Favorites: {
      screen: FavoriteStack,
      navigationOptions: {
        tabBarIcon: <Ionicons name="ios-heart" size={25} color="white" />,
        tabBarColor: `orchid`,
      },
    },
  },
  {
    initialRouteName: `Events`, // this will change back to login
    shifting: true,
    order: [`Events`, `Favorites`, `Profile`, 'Login'],
    barStyle: { backgroundColor: `darkturquoise` },
    activeTintColor: `white`,
  }
);

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Main: {
      screen: RootStack,
    },
  },
  {
    mode: 'modal',
    navigationOptions: {
      initialRouteName: `Login`,
      header: null,
    },
  }
);

const client = new ApolloClient({
  uri: `http://localhost:8080/graphql`,
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <LoginStack />
      </ApolloProvider>
    );
  }
}

export default App;
