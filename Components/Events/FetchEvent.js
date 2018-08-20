import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import Favoriting from './Favoriting'
import {
  Text, View, Button, Image, ScrollView, FlatList
} from 'react-native';
import styles from '../styles';

const eventQuery = gql`
  query Event($eventId: ID){
    event(id: $eventId) {
      id
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
      favorite
    }
  }
`;


class FetchEvent extends Component {
  render() {
    const { eventId } = this.props.navigation.state.params
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
                  style={event.photo ? { height: 250, width: 400, marginBottom: 15, alignSelf: `center` } : { height: 230, marginBottom: 20, alignSelf: `center`}  }
                  resizeMode="cover"
                />
                  <Favoriting eventId={event.id} favorite={event.favorite}/>
            </View>
            <View style={styles.singleEventText}>
              <View style={{marginBottom: 30}}>
                <Text style={{lineHeight: 25, fontWeight: `bold`}}>
                  {`Date: ${event.date} | Time: ${event.time}`
                + `\n${event.venueName}: ${event.venueAddress}, ${event.eventCity}`}</Text>
                <Text style={{lineHeight: 25}}>{`Meetup Group: ${event.eventGroup}`}</Text>
              </View>

              <Text style={{ fontStyle: `italic`, marginBottom: 5}}>Event Details:</Text>
              <Text style={{marginBottom: 30}}>{event.description}</Text>
              <Text style={{ fontStyle: `italic`, marginBottom: 10}}>Event Hosts:</Text>
              <View style={{flexDirection: `row`}}>
                <View>
                  {event.hostPhotos.map(photo => <Image key={photo} source={{uri:photo}} style={{height: 70, width: 70, borderRadius: 35, margin: 7}}/>)}
                </View>
                <View>
                  {event.hostNames.map(name => <Text key={name} style={{flex: 1, top: `5%`, marginLeft: 10}}>{`\n${name}`}</Text>)}
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
