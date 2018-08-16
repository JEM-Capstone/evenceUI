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
    alignItems: `center`,
    justifyContent: `flex-start`,
  },
  singleEventHeader: {
    fontSize: 20,
    alignSelf: `center`,
    marginTop: 20,
    marginBottom: 20,
  }
});

export default styles;
