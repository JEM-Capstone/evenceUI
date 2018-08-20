import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#fff`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  listText: {
    marginTop: 10,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    fontWeight: `bold`,
    fontSize: 15,
    marginBottom: 5,
  },
  singleEvent: {
    flex: 1,
    backgroundColor: `#fff`,
    justifyContent: `flex-start`,
  },
  singleEventHeader: {
    fontSize: 20,
    fontWeight: `bold`,
    textAlign: `center`,
    margin: 20,
    color: `#01b781`
  },
  profileWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  profilePicture: {
    height: 200,
    width: 400,
    // width: '100VW',
    // alignSelf: 'stretch',
    // marginTop: 0,
    // marginRight: 'auto',
    // marginLeft: 'auto',
  }
});

export default styles;
