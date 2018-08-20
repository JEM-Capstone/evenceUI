import React from 'react'
import { Button, StyleSheet, Text, View, Linking } from 'react-native'
import { AuthSession, WebBrowser } from 'expo'
import axios from 'axios'

const LI_APP_ID = '867abnxmxsh4a0'
const LI_APP_SECRET = 'R5xYPXLjHE6BVNBj'
// this is something we make up & is supposed to be "hard to guess" - See the following under Step 2 and look for the parameters table
// https://developer.linkedin.com/docs/oauth2
const LI_APP_STATE = 'HsdHSD89SAD3'

export default class Login extends React.Component {
  state = {
    serverUrl: `http://172.17.20.3:8080`, // this should change depending on where the server is running
    result: null,
    accessToken: '',
    linkedinBasicProfile: '',
  };

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Button title="| Login with LinkedIn |" onPress={this.handleOAuthLogin} />
        <Button title="| Test |" onPress={this.test} />
        {this.state.result ? ( <Text>{JSON.stringify(this.state.result.type)}</Text> ) : null}
      </View>
    )
  }

  test = async () => {
    console.log('test!')
    try {
      // let clientId = await axios.get(`http://google.com`)
      let clientId = await axios.get(`${this.state.serverUrl}/auth/linkedin/clientid`)
      let clientSecret = await axios.get(`${this.state.serverUrl}/auth/linkedin/clientsecret`)
      let appState = await axios.get(`${this.state.serverUrl}/auth/linkedin/appstate`)
      console.log(clientId.data, clientSecret.data, appState.data)
      // console.log(clientId);

    } catch (err) {
      console.log('An error',err);
      alert(err.message)
    }
  }

  handleOAuthLogin = async () => {
    // // gets the url to direct back to the app after any request to linkedin
    let redirectUrl = AuthSession.getRedirectUrl()


    let clientId = await axios.get(`${this.state.serverUrl}/auth/linkedin/clientid`)
    let clientSecret = await axios.get(`${this.state.serverUrl}/auth/linkedin/clientsecret`)
    let appState = await axios.get(`${this.state.serverUrl}/auth/linkedin/appstate`)

    await this.getAuthCode(redirectUrl, clientId.data, appState.data)

    // this check gaurds against CSRF attacks
    if (this.state.result.params.state !== appState.data) {
      console.log('Not Authorized!') // this should be a more useful message and also throw a HTTP 401 error
    } else {
      await this.getAccessToken(redirectUrl, clientId.data, clientSecret.data)
    }

    // Get that basic profile info including linkedinId
    await this.getBasicUserProfile(this.state.accessToken)
    // Get more complete info on our backend/database
    let backendAuth = await this.handlePassportLogin()
    console.log('BACKEND AUTH:', backendAuth)
  }

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
    })
    // save the data we get back, including the auth code
    await this.setState({ result })
    // console.log('access code:', this.state.result)
  }

  // Get an access Token from linkedin
  getAccessToken = async (redirectUrl, clientId, clientSecret) => {

    try {
      let getTokenUrl =
      `https://www.linkedin.com/oauth/v2/accessToken` +
      `?grant_type=authorization_code` +
      `&code=${this.state.result.params.code}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&client_id=${LI_APP_ID}` +
      `&client_secret=${LI_APP_SECRET}`

      let res = await axios.post(getTokenUrl)
      // console.log('Access Token (res.data):', res.data)
      await this.setState({ accessToken: res.data.access_token })
      // console.log('Access Token:', this.state.accessToken)
    } catch (err) {
      console.log('ERROR WHILE GETTING TOKEN:', err)
    }
  }


  // Get the v1 api user profile info --> we're most interested in the linkedinId for more complete user info lookup later
  getBasicUserProfile = async (accessToken) => {
    try {
      // let profile = await axios({
      //   method: 'get',
      //   url: 'https://api.linkedin.com/v2/me',
      //   headers: {
      //     'X-RestLi-Protocol-Version': '2.0.0',
      //     "Authorization": `Bearer ${accessToken}`,
      //   }
      // })

      // Get the user info
      let {data} = await axios.get(`https://api.linkedin.com/v1/people/~?oauth2_access_token=${accessToken}&format=json`)
      this.setState({ linkedinBasicProfile: data })
    } catch(err) {
      console.log('Error getting user profile:', err)
    }
  }

  handleRedirect = async (event) => {
    // WebBrowser.dismissBrowser();
    // WebBrowser.dismissAuthSession();
    const data = Linking.parse(event.url);
    // await this.setState({ redirectData: data })
    console.log(`data in handleRedirect`, data);
  }

  // Login...AGAIN --> This time using passport & all on the backend so that we can save the more complete user info made available when passport is used
  handlePassportLogin = async () => {
    // gets the url to direct back to the app after any request to linkedin

    this.addLinkingListener();
    const redirectUrl = await Linking.getInitialURL();

    try {
      // const authResult = await WebBrowser.openAuthSessionAsync(`http://192.168.1.100:8080/auth/linkedin?${redirectUrl}`, redirectUrl);
      const authResult = await WebBrowser.openAuthSessionAsync(`${this.state.serverUrl}/auth/linkedin/`, redirectUrl);
      // const authResult = await Linking.openURL(`http://172.17.20.3:8080/auth/linkedin?${redirectUrl}`, redirectUrl);
      console.log('my auth result:', authResult);
      await this.setState({ authResult });


      // let userAttempt = await axios.get(`http://172.17.20.3:8080/auth/linkedin/me`)
      // console.log('userAttempt', userAttempt)

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
    let res = await axios.get(`${this.state.authUrl}/auth/linkedin/logout`)
    await this.setState({ authResult: {} })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// curl -H "Authorization: Bearer AQVK8JM9VnAh_5NR1vE2YAAVNHJDX7-JTuEescS8OFruQ8TShx-SMKBy-NcK7_WCbYSCuI6z-_DAaPv8HhuJoYtccFmot3qr1ohoGBSSlYq1cZeot1pDpePM5wLsbiDZkaFH-fkLRMngp3Kbsid-yF3djv0lPGFddZFhcG4K31Z7uF58izsPeLUCCZ3miAMtyPKDF1ljoLRX_O_HileoZ3hA-MziplbgCg994rXDPY_qYHwAgdjgkemMMn_0ut9PpYRMsNSewbxhZKt8x7MXtJCVXUqA5m_y2qWkHfcyoHNrvLl3ui24IL5aSbvMH2rBn7dL1Ru5KPyMG-pDB8LT9ZeESqLPfA" "https://api.linkedin.com/v2/me?format=json"
//
// 'https://api.linkedin.com/v1/people/~?oauth2_access_token=AQV3irm1Xgl5JVkOW2x5jXXA-9euAXvrvNFKvx8q8pDLjtW9nSWysolo9jI6jG7dRiPejmbUt8o1kj7OFNwGbfuAChnHM7tlRXweMM-8lm3_TaCGZ_DKgUUOEANrocIp6lkHQjklaWo-fVtSkzOj95553DH96p5KrG268Zax-Gpl7EtDazuenvu-r90JAgV2RRhAv68d-g1qCczGz1xFihbqUBoAAVJckoT0wmF7eoeiL2zUHGx6cQ2gbHJFQqNuM1RGDBtW-JUubcYtFq0735-106dAH1ilKrc8B6sX8IpResSEnYgjo2OSXYhRkXV0EzN79lna6qn584J_6-gf6gCv3Cnh5w&format=json'
// 'https://api.linkedin.com/v2/me/~?oauth2_access_token=AQVK8JM9VnAh_5NR1vE2YAAVNHJDX7-JTuEescS8OFruQ8TShx-SMKBy-NcK7_WCbYSCuI6z-_DAaPv8HhuJoYtccFmot3qr1ohoGBSSlYq1cZeot1pDpePM5wLsbiDZkaFH-fkLRMngp3Kbsid-yF3djv0lPGFddZFhcG4K31Z7uF58izsPeLUCCZ3miAMtyPKDF1ljoLRX_O_HileoZ3hA-MziplbgCg994rXDPY_qYHwAgdjgkemMMn_0ut9PpYRMsNSewbxhZKt8x7MXtJCVXUqA5m_y2qWkHfcyoHNrvLl3ui24IL5aSbvMH2rBn7dL1Ru5KPyMG-pDB8LT9ZeESqLPfA'
// https://api.linkedin.com/v2/me?format=json



//   authUrl:
//   `https://www.linkedin.com/uas/oauth2/authorization` +
//   `?client_id=${LI_APP_ID}` +
//   `&redirect_uri=${encodeURIComponent(redirectUrl)}`,



// `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
// `&client_id=${LI_APP_ID}` +
// `&redirect_uri=${encodeURIComponent(redirectUrl)}`,


// `https://www.linkedin.com/uas/oauth2/authorization?client_id=759dczzx23nyic&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flinkedin%2Fcallback&response_type=code&scope=r_basicprofile+r_emailaddress&state=8da572e31a8e66e6b1de54acddd14937d976ed06d7ed3217&client_id=*`
