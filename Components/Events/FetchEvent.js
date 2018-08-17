import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import {
  Text, View, Button, Image, ScrollView, FlatList
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
      hostNames
      hostPhotos
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
              <ScrollView>
              <Text style={styles.singleEventHeader}>{event.eventName}</Text>
              <View>
              <Image
                source={event.photo ? { uri: event.photo } : require(`../../resources/calendar.png`)}
                style={event.photo ? { height: 250, width: 400, alignSelf: `center` } : { height: 230, marginBottom: 20, alignSelf: `center`}  }
                resizeMode="cover"
              />
            </View>
            <View style={styles.listText}>
              <View style={{marginBottom: 30}}>
                <Text style={{lineHeight: 20, fontWeight: `bold`}}>
                  {`Date: ${event.date} | Time: ${event.time}`
                + `\n${event.venueName}: ${event.venueAddress}, ${event.eventCity}`}</Text>
                <Text style={{lineHeight: 20}}>{`Meetup Group: ${event.eventGroup}`}</Text>
              </View>

              <Text style={{ fontStyle: `italic`}}>Event Details:</Text>
              <Text style={{marginBottom: 30}}>{event.description}</Text>
              <Text style={{ fontStyle: `italic`, marginBottom: 10}}>Event Hosts:</Text>
              <View style={{flexDirection: `row`}}>
                <View>
                  {event.hostPhotos.map(photo => <Image source={{uri:photo}} style={{height: 70, width: 70, borderRadius: 35, margin: 7}}/>)}
                </View>
                <View>
                  {event.hostNames.map(name => <Text style={{flex: 1, top: `8%`, marginLeft: 10}}>{`\n${name}`}</Text>)}
                </View>
              </View>
            </View>
          </ScrollView>
            </View>
          )

        }}
      </Query>
      </View>
    );
  }
}

export default FetchEvent;
