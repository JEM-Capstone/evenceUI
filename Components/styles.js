import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#fff`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  infoBox: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    backgroundColor: `#fcf8c4`
  },
  header: {
    fontWeight: `bold`,
    fontSize: 17,
    marginBottom: 5,
  },
  singleEvent: {
    flex: 1,
    backgroundColor: `#fff`,
    justifyContent: `flex-start`,
  },
  singleEventText: {
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
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
  },
  profileHeader: {
    flex: 1,
    width: 400,
    height: 250,
    backgroundColor: 'rgba(100,0,255, 0.99)',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowRadius: 15,
    shadowOpacity: 5,
  },
  profilePicture: {
    // flex: 1,
    height: 200,
    width: 200,
    marginTop: 120,
    marginLeft: -30,
    borderRadius: 0,
  },
  profileName: {
    fontSize: 40,
  },
  profileTitleWrapper: {
    paddingLeft: 10,
    marginTop: 100,
    marginRight: 40,
    marginLeft: 0,
    color: `darkturquoise`
  },
  favsList: {
    marginTop: 10,
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconOutline: {
    height: 44,
    width: 44,
    borderWidth: 2,
    borderRadius: 22,
    borderColor: `silver`,
    alignItems:`center`,
    justifyContent: `center`,
    marginRight: 20
  },
  profilePic: {
    height: 300,
    width: 300,
    alignSelf: `center`,
    borderRadius: 150,
    marginTop: 30
  },
  profileTextContainer: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: `#c9d1e2`
  },
  profileEditableText: {
    lineHeight: 23,
    fontSize: 14
  }
});

export default styles;
