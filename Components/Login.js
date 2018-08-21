import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Linking,
  AsyncStorage,
} from 'react-native';
import { AuthSession, WebBrowser } from 'expo';
import axios from 'axios';

export default class Login extends React.Component {
  state = {
    serverUrl: `http://172.17.21.36:8080`, // this should change depending on where the server is running
    result: null,
    accessToken: '',
    linkedinBasicProfile: '',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          title="| Login with LinkedIn |"
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

    // let clientId = await axios.get(
    //   `${this.state.serverUrl}/auth/linkedin/clientid`
    // );
    // let clientSecret = await axios.get(
    //   `${this.state.serverUrl}/auth/linkedin/clientsecret`
    // );
    // let appState = await axios.get(
    //   `${this.state.serverUrl}/auth/linkedin/appstate`
    // );

    // await this.getAuthCode(redirectUrl, clientId.data, appState.data);

    // // this check gaurds against CSRF attacks
    // if (this.state.result.params.state !== appState.data) {
    //   console.log('Not Authorized!'); // this should be a more useful message and also throw a HTTP 401 error
    // } else {
    //   await this.getAccessToken(redirectUrl, clientId.data, clientSecret.data);
    // }

    // // Get that basic profile info including linkedinId
    // await this.getBasicUserProfile(this.state.accessToken);
    // Get more complete info on our backend/database
    let backendAuth = await this.handlePassportLogin();
    // console.log('BACKEND AUTH:', backendAuth);
  };

  // Get an auth code for LinkedIn
  getAuthCode = async (redirectUrl, clientId, appState) => {
    // make a browser request to get an Auth Code from LinkedIn
    // The auth code is necessary to receive an access token
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.linkedin.com/oauth/v2/authorization` +
        `?response_type=code` +
        `&client_id=${clientId}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&state=${appState}`,
      // `&scope=r_basicprofile`,
    });
    // save the data we get back, including the auth code
    await this.setState({ result });
    // console.log('access code:', this.state.result)
  };

  // Get an access Token from linkedin
  getAccessToken = async (redirectUrl, clientId, clientSecret) => {
    try {
      let getTokenUrl =
        `https://www.linkedin.com/oauth/v2/accessToken` +
        `?grant_type=authorization_code` +
        `&code=${this.state.result.params.code}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&client_id=${clientId}` +
        `&client_secret=${clientSecret}`;

      let res = await axios.post(getTokenUrl);
      // console.log('Access Token (res.data):', res.data)
      await this.setState({ accessToken: res.data.access_token });
      // console.log('Access Token:', this.state.accessToken)
    } catch (err) {
      console.log('ERROR WHILE GETTING TOKEN:', err);
    }
  };

  // Get the v1 api user profile info --> we're most interested in the linkedinId for more complete user info lookup later
  getBasicUserProfile = async accessToken => {
    try {
      // Get the user info
      let { data } = await axios.get(
        `https://api.linkedin.com/v1/people/~?oauth2_access_token=${accessToken}&format=json`
      );
      this.setState({ linkedinBasicProfile: data });
      console.log('the user data for the frontend:', data);
    } catch (err) {
      console.log('Error getting user profile:', err);
    }
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
      console.log('storing the user:', data);
    } catch (error) {
      // Error saving data
      console.log('error inside storedata:', error);
    }
  };

  // Login...AGAIN --> This time using passport & all on the backend so that we can save the more complete user info made available when passport is used
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
      console.log('this is front end user info:', data);

      this.storeData(data.id + '');

      // await this.setState({ authResult });
      // Below ostensibly returns a user profile - but it currently isn't
      // let userAttempt = await axios.get(`http://172.17.20.3:8080/auth/linkedin/me`)
      // console.log('userAttempt', userAttempt)
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
    alignItems: 'center',
    justifyContent: 'center',
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
