import React from 'react';
import {
  Button, StyleSheet, Text, View,
} from 'react-native';
import { AuthSession, WebBrowser, Linking } from 'expo';
import axios from 'axios';

const LI_APP_ID = `867abnxmxsh4a0`;
const LI_APP_SECRET = `R5xYPXLjHE6BVNBj`;
// this is something we make up & is supposed to be "hard to guess" - See the following under Step 2 and look for the parameters table
// https://developer.linkedin.com/docs/oauth2
const LI_APP_STATE = `HsdHSD89SAD3`;

export default class Login extends React.Component {
  state = {
    // result: null,
    // redirectData: null,
    authResult: {},
  };

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.authResult.type && this.state.authResult.type === `success`) {
      return (
        <View style={styles.container}>
          <Text>Hey there, user!</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Button title="Login with LinkedIn" onPress={this.handleOAuthLogin} />
      </View>
    );
  }


  handleRedirect = async (event) => {
    WebBrowser.dismissBrowser();
    const data = Linking.parse(event.url);
    // await this.setState({ redirectData: data })
    console.log(`data in handleRedirect`, data);
  }

  handleOAuthLogin = async () => {
    // gets the url to direct back to the app after any request to linkedin
    const redirectUrl = await Linking.getInitialURL();
    // this should change depending on where the server is running
    const authUrl = `http://172.17.20.3:8080/auth/linkedin`;

    this.addLinkingListener();

    try {
      const authResult = await WebBrowser.openAuthSessionAsync(`http://172.17.20.3:8080/auth/linkedin`, redirectUrl);
      await console.log(`inside handleOauthLogin`, authResult);
      await this.setState({ authResult });
      console.log(this.state);
    } catch (err) {
      console.log(`A MASSIVE ERROR`, err);
    }

    this.removeLinkingListener();
  }

  addLinkingListener = () => {
    Linking.addEventListener(`url`, this.handleRedirect);
  }

  removeLinkingListener = () => {
    Linking.removeEventListener(`url`, this.handleRedirect);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
});
