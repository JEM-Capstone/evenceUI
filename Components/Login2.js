import React from 'react';
// import { Button, StyleSheet, Text, View, } from 'react-native';
import { Button, StyleSheet, Text, View, Linking} from 'react-native';
// import { AuthSession, WebBrowser, Linking } from 'expo';
import { AuthSession, WebBrowser } from 'expo';
import axios from 'axios';




export default class Login extends React.Component {
  state = {
    authResult: {},
    authUrl: `http://192.168.1.100:8080`, // this should change depending on where the server is running
    serverUrl: `http://192.168.1.100:8080`, // this should change depending on where the server is running
  };

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.authResult.type && this.state.authResult.type === `success`) {
      return (
        <View style={styles.container}>
          <Text>Hey there, user!</Text>
          <Button title="Logout" onPress={this.handleLogout} />
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
    // WebBrowser.dismissBrowser();
    // WebBrowser.dismissAuthSession();
    const data = Linking.parse(event.url);
    // await this.setState({ redirectData: data })
    console.log(`data in handleRedirect`, data);
  }

  handleOAuthLogin = async () => {
    // gets the url to direct back to the app after any request to linkedin

    this.addLinkingListener();
    const redirectUrl = await Linking.getInitialURL();

    try {
      // const authResult = await WebBrowser.openAuthSessionAsync(`http://192.168.1.100:8080/auth/linkedin?${redirectUrl}`, redirectUrl);
      const authResult = await WebBrowser.openAuthSessionAsync(`${this.state.serverUrl}/auth/linkedin`, redirectUrl);
      // const authResult = await Linking.openURL(`http://172.17.20.3:8080/auth/linkedin?${redirectUrl}`, redirectUrl);
      console.log('my auth result:', authResult);
      await this.setState({ authResult });


      let userAttempt = await axios.get(`http://${this.state.serverUrl}:8080/auth/linkedin/me`)
      console.log('userAttempt', userAttempt)

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

  handleLogout = async () => {
    let res = await axios.get(`${this.state.serverUrl}/auth/linkedin/logout`)
    await this.setState({ authResult: {} })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
