import React, { Component } from 'react';
import { FlatList, ListItem, List, Text, TextInput, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { SafeAreaView } from 'react-navigation';
import styles from '../styles';


class UserLocation extends Component {
  constructor(props){
    super(props)
    this.state = {
      location: this.props.user.area}
    }

  render() {
    const { user } = this.props
    return (
      <View style={{flexDirection: `row`, justifyContent: `center`, alignItems:`center`, marginBottom: 7}}>
        <Text style={{marginRight: 5, fontSize: 15}}>Location: </Text>
        <TextInput style={{padding: 5, height: 30, width: 150, borderColor: `silver`, borderWidth: 1}}
        onChangeText={(location) => this.setState({location})}
        value={this.state.location}
        />
        <TouchableHighlight>
          <Text style={{marginLeft: 10, color: `#0e4eb5`}}>Update</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default UserLocation;
