import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';


const eventQuery = gql`
  {
    event (id: 1) {
      eventName
      date
      time
      eventGroup
      eventCity
      description
    }
  }
`;


class FetchEvent extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return (<Text>Loading...</Text>);
    }
    const {
      eventName, date, time, eventGroup, eventCity, description,
    } = this.props.data.event;
    return (
      <View>
        <Text>{eventName}</Text>
        <Text>{`Date: ${date} | Time: ${time}`}</Text>
      </View>
    );
  }
}

export default graphql(eventQuery)(FetchEvent);
