import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import { WebBrowser, openAuthSessionAsync } from 'expo';


class TestTwo extends React.Component {
  // This just gives you a header with a title
  static navigationOptions = {
    title: `Second Test View`,
  }

  state = {

  }

  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>

        <Text>This really is just a second test</Text>
        <Button
          title="Test"
          onPress={() =>
            navigate(`Test`)
          }
        />
        // example of how to add a back Button
        // Note that this doesn't seem to work on the initial Route Component
        // specified in App.js as 'initialRouteName'
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Log Users"
          onPress={() => this.logUsers()}
        />
        <Button
          title="Open Web Browser"
          onPress={() => this.openWebBrowser()}
        />
        <Button
          title="Open Auth Web Browser"
          onPress={() => this.openAuthWebBrowser()}
        />
      </View>
    );
  }

  logUsers = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/users`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  // Example of a realy simple way to open a web browser in app
  openWebBrowser = async () => {
    const result = await WebBrowser.openBrowserAsync(`https://google.com`);
  }

  // Example of a realy simple way to open a web browser for oAuth2 in browser
  openAuthWebBrowser = async () => {
    const result = await WebBrowser.openAuthSessionAsync(`https://google.com`);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#fff`,
    alignItems: `center`,
    justifyContent: `center`,
  },
});

export default TestTwo;
