import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';


class Test extends React.Component {
  static navigationOptions = {
    title: `Test View`,
  }


  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>This really is just a test</Text>
        <Button
          title="SecondTest"
          onPress={() =>
            navigation.navigate(`SecondTest`)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#fff`,
    alignItems: `center`,
    justifyContent: `center`,
  },
});

export default Test;
