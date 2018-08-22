import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Linking,
  AsyncStorage,
  Image
} from 'react-native';
import { AuthSession, WebBrowser } from 'expo';
import axios from 'axios';
import { findUser } from './utils';
import { AllEvents } from './Events/AllEvents';

export default class Login extends React.Component {
  state = {
    serverUrl: `http://172.17.21.53:8080`, // this should change depending on where the server is running
    result: null,
    accessToken: ``,
    linkedinBasicProfile: ``,
    userId: null,
  };

  async componentDidMount() {
    // await AsyncStorage.clear();
    const userId = await findUser();
    console.log(`inside did mount login:`, userId);
    console.log(`component props for login:`, this.props);
    if (userId) {
      this.props.navigation.replace(`Main`);
    }
  }

  async componentDidUpdate() {
    // await AsyncStorage.clear();
    const userId = await findUser();
    console.log(`inside did update login:`, userId);
    console.log(`component props for login:`, this.props);
    if (userId) {
      this.props.navigation.replace(`Main`);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25, color: `darkturquoise`, marginBottom: 20}}>Welcome to Evence!</Text>
        <Image
          source={require(`../resources/evence-logo.png`)}
          style={{height: 250, marginBottom: 20}}
          resizeMode="contain"
        />
        <Button
          title="Login with LinkedIn"
          onPress={this.handleOAuthLogin}
        />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result.type)}</Text>
        ) : null}
      </View>
    );
  }

  handleOAuthLogin = async () => {
    // gets the url to direct back to the app after any request to linkedin
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl);

    let backendAuth = await this.handlePassportLogin();
  };

  handleRedirect = async event => {
    // WebBrowser.dismissBrowser();
    // WebBrowser.dismissAuthSession();
    const data = Linking.parse(event.url);
    // await this.setState({ redirectData: data })
    console.log(`data in handleRedirect`, data);
  };

  storeData = async data => {
    try {
      await AsyncStorage.setItem(`userId`, data);
      console.log(`storing the user:`, data);
    } catch (error) {
      // Error saving data
      console.log(`error inside storedata:`, error);
    }
  };

  // Login -->using passport & all on the backend so that we can save the more complete user info made available when passport is used
  handlePassportLogin = async () => {
    // gets the url to direct back to the app after any request to linkedin

    this.addLinkingListener();
    const redirectUrl = await Linking.getInitialURL();

    try {
      const authResult = await WebBrowser.openAuthSessionAsync(
        `${this.state.serverUrl}/auth/linkedin/`,
        redirectUrl
      );
      const { data } = await axios.get(
        `${this.state.serverUrl}/auth/linkedin/user`
      );
      console.log(`this is front end user info:`, data);

      this.storeData(data.id + ``);
      this.setState({ userId: data.id });
    } catch (err) {
      console.log(`A MASSIVE ERROR`, err);
    }

    this.removeLinkingListener();
  };

  addLinkingListener = () => {
    Linking.addEventListener(`url`, this.handleRedirect);
  };

  removeLinkingListener = () => {
    Linking.removeEventListener(`url`, this.handleRedirect);
  };

  handleLogout = async () => {
    let res = await axios.get(`${this.state.authUrl}/auth/linkedin/logout`);
    await this.setState({ authResult: {} });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
});

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    YOU CAN USE THE FOLLOWING ROUTES TO TEST WHAT YOU GET BACK FROM LINKED IN
 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

// curl -H "Authorization: Bearer AQVK8JM9VnAh_5NR1vE2YAAVNHJDX7-JTuEescS8OFruQ8TShx-SMKBy-NcK7_WCbYSCuI6z-_DAaPv8HhuJoYtccFmot3qr1ohoGBSSlYq1cZeot1pDpePM5wLsbiDZkaFH-fkLRMngp3Kbsid-yF3djv0lPGFddZFhcG4K31Z7uF58izsPeLUCCZ3miAMtyPKDF1ljoLRX_O_HileoZ3hA-MziplbgCg994rXDPY_qYHwAgdjgkemMMn_0ut9PpYRMsNSewbxhZKt8x7MXtJCVXUqA5m_y2qWkHfcyoHNrvLl3ui24IL5aSbvMH2rBn7dL1Ru5KPyMG-pDB8LT9ZeESqLPfA" "https://api.linkedin.com/v2/me?format=json"
//
// 'https://api.linkedin.com/v1/people/~?oauth2_access_token=AQV3irm1Xgl5JVkOW2x5jXXA-9euAXvrvNFKvx8q8pDLjtW9nSWysolo9jI6jG7dRiPejmbUt8o1kj7OFNwGbfuAChnHM7tlRXweMM-8lm3_TaCGZ_DKgUUOEANrocIp6lkHQjklaWo-fVtSkzOj95553DH96p5KrG268Zax-Gpl7EtDazuenvu-r90JAgV2RRhAv68d-g1qCczGz1xFihbqUBoAAVJckoT0wmF7eoeiL2zUHGx6cQ2gbHJFQqNuM1RGDBtW-JUubcYtFq0735-106dAH1ilKrc8B6sX8IpResSEnYgjo2OSXYhRkXV0EzN79lna6qn584J_6-gf6gCv3Cnh5w&format=json'
// 'https://api.linkedin.com/v2/me/~?oauth2_access_token=AQVK8JM9VnAh_5NR1vE2YAAVNHJDX7-JTuEescS8OFruQ8TShx-SMKBy-NcK7_WCbYSCuI6z-_DAaPv8HhuJoYtccFmot3qr1ohoGBSSlYq1cZeot1pDpePM5wLsbiDZkaFH-fkLRMngp3Kbsid-yF3djv0lPGFddZFhcG4K31Z7uF58izsPeLUCCZ3miAMtyPKDF1ljoLRX_O_HileoZ3hA-MziplbgCg994rXDPY_qYHwAgdjgkemMMn_0ut9PpYRMsNSewbxhZKt8x7MXtJCVXUqA5m_y2qWkHfcyoHNrvLl3ui24IL5aSbvMH2rBn7dL1Ru5KPyMG-pDB8LT9ZeESqLPfA'
// https://api.linkedin.com/v2/me?format=json

// `https://www.linkedin.com/uas/oauth2/authorization?client_id=759dczzx23nyic&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flinkedin%2Fcallback&response_type=code&scope=r_basicprofile+r_emailaddress&state=8da572e31a8e66e6b1de54acddd14937d976ed06d7ed3217&client_id=*`
