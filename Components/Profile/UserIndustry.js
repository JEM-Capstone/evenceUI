import React, { Component } from 'react';
import { FlatList, ListItem, List, Text, TextInput, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { SafeAreaView } from 'react-navigation';
import styles from '../styles';


class UserIndustry extends Component {
  constructor(props){
    super(props)
    this.state = {
      industry: this.props.user.industry}
    }

  render() {
    const { user } = this.props
    return (
      <View style={{flexDirection: `row`, justifyContent: `center`, alignItems:`center`,}}>
        <Text style={{marginRight: 5, fontSize: 15}}>Industry: </Text>
        <TextInput style={{padding: 5, height: 30, width: 150, borderColor: `silver`, borderWidth: 1}}
        onChangeText={(industry) => this.setState({industry})}
        value={this.state.industry}
        />
        <TouchableHighlight>
          <Text style={{marginLeft: 10, color: `#0e4eb5`}}>Update</Text>
        </TouchableHighlight>
      </View>

    );
  }
}

export default UserIndustry;


{/* title={`update`} color={`#0e4eb5`} style={{ fontSize: 5 }}/> */}
