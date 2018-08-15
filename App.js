import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import expo from 'expo';
import {
  Test, SecondTest, Login, AllEvents, Favorites, Profile,
} from './Components/index';

const RootStack = createMaterialBottomTabNavigator(
  {
    Login,
    Test,
    SecondTest,
    AllEvents: {
      screen: AllEvents,
    },
    Profile: {
      screen: Profile,
    },
    Favorites: {
      screen: Favorites,
    },
  },
  {
    initialRouteName: `AllEvents`,
    shifting: true,
    order: [`AllEvents`, `Favorites`, `Profile`],
    activeTintColor: `#f0edf6`,
    inactiveTintColor: `#3e2465`,
    barStyle: { backgroundColor: `#694fad` },
  },
);

class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}

export default App;
