import React, { Component } from 'react';
import {
  Text, View, Button, Image
} from 'react-native';
import { SafeAreaView } from 'react-navigation';


class Splash extends Component {
  render() {
    return (
      <SafeAreaView >
        <View style={{justifyContent: `center`, alignItems: `center`}}>
        <Image
          source={require(`../resources/evence-logo.png`)}
          style={{height: 350, marginTop: 80}}
          resizeMode="contain"
        />
        <Text style={{color: `grey`, fontSize: 23, fontStyle: `italic`, marginTop: 20, textAlign: `center`}}>
          {`Hang tight,\nwe're fetching your events...`}
        </Text>
      </View>
    </SafeAreaView>
    )
  }
}

export default Splash
