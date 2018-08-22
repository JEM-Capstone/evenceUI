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
    height: 200,
    width: 200,
    alignSelf: `center`,
    borderRadius: 100,
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
