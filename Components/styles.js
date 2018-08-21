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
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingTop: 15,
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
    marginLeft: 15,
    marginRight: 15,
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
  }
});

export default styles;
