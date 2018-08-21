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
    backgroundColor: '#E8F0F7',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginLeft: 20,
  },
  profileHeader: {
    flex: 1,
    width: 400,
    height: 250,
    backgroundColor: 'rgba(100,0,255, 0.99)',
    alignItems: 'center',
    // justifyContent: 'center',
    // borderBottomColor: '#000000',
    // borderBottomWidth: 6,
    shadowColor: '#000000',
    shadowRadius: 15,
    shadowOpacity: 5,
  },
  profilePicture: {
    // flex: 1,
    height: 200,
    width: 200,
    // width: '100VW',
    // alignSelf: 'stretch',
    marginTop: 120,
    // marginBottom: 0,
    // marginRight: 'auto',
    marginLeft: 50,
    borderRadius: 0,
  },
  profileName: {
    fontSize: 40,
    // textShadowColor: '#000000',
    // textShadowOffset: {width: 1, height: 1},
    // textShadowRadius: 7,
  },
  profileTitleWrapper: {
    paddingLeft: 10,
    marginTop: 100,
    marginRight: 40,
    marginLeft: 0,
    // borderWidth: 1,
    // borderColor: '#000000',
    // backgroundColor: '#D98C8E',
  }
});

export default styles;
