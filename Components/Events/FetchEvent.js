import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import {
  StyleSheet, Text, View, Button, Image
} from 'react-native';
import styles from '../styles';

const eventQuery = gql`
  query Event($eventId: ID){
    event(id: $eventId) {
      eventName
      photo
      date
      time
      eventGroup
      eventCity
      rsvps
      venueName
      venueAddress
      fee
      description
      directLink
      pastEvents
      webActions
    }
  }
`;


class FetchEvent extends Component {
  render() {
    console.log(this.props.navigation);
    const { eventId } = this.props.navigation.state.params
    console.log(typeof eventId);
    return (
      <View style={styles.singleEvent}>
      <Query query={eventQuery} variables={{eventId}}>
        {({ data: { event }, error, loading }) => {
          if (error) return (<View><Text>There was an error</Text></View>)
          if (loading) return (<View><Text>Loading the data</Text></View>)
          return (
            <View>
              <Text style={styles.singleEventHeader}>{event.eventName}</Text>
              <View>
              <Image
                source={event.photo ? { uri: event.photo } : require(`../../resources/calendar.png`)}
                style={event.photo ? { height: 250, width: 350 } : { height: 200, alignSelf: `center`}  }
                resizeMode="contain"
              />
            </View>
            <View>
              <Text>{`Date: ${event.date} | Time: ${event.time}`}</Text>
              <Text>{event.venueName}: {event.venueAddress}</Text>
            </View>
            </View>
          )
        }}
      </Query>
      </View>
    );
  }
}

export default FetchEvent;
