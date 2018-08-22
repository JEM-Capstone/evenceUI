import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import Favoriting from './Favoriting'
import {
  Text, View, Button, Image, ScrollView, FlatList, Linking, TouchableHighlight
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {findFood, findBev} from '../utils'
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
              <View style={{marginBottom: 20, padding: 10, backgroundColor: `#cff9f9`}}>
                <Text style={{marginBottom: 8, fontWeight: `bold`}}>{`Date: ${event.date}  |  Time: ${event.time}`}</Text>
                <Text style={{marginBottom: 8, fontWeight: `bold`}}>{`${event.venueName}: ${event.venueAddress}, ${event.eventCity}`}</Text>
                <Text style={{marginBottom: 8, fontWeight: `bold`}}>{event.eventGroup}</Text>

                <TouchableHighlight
                  onPress={() => Linking.openURL(event.directLink)}
                  underlayColor={`#cff9f9`}>
                  <Text style={{color: `#0e4eb5`}}>Click here to RSVP</Text>
                </TouchableHighlight>

              </View>

                <Text style={{ fontWeight: `bold`, marginBottom: 10}}>Event Details:</Text>
                <Text style={{marginBottom: 30}}>{event.description}</Text>

                <Text style={{ fontWeight: `bold`, marginBottom: 10}}>Event Hosts:</Text>

              <View style={{flexDirection: `row`}}>
                <View>
                  {event.hostPhotos.map(photo => (
                    <Image key={photo} source={ photo ? { uri: photo } : require(`../../resources/host-placeholder.jpg`) } style={{height: 70, width: 70, borderRadius: 35, margin: 7}}/>
                  ))}
                </View>
                <View>
                  {event.hostNames.map(name => <Text key={name} style={{flex: 1, top: `5%`, marginLeft: 10}}>{`\n${name}`}</Text>)}
                </View>
              </View>

              <View>
                <Text style={{ fontWeight: `bold`, marginBottom: 10, marginTop: 40}}>What do the icons mean?</Text>

                  {event.rsvps > 20 &&
                  <View style={{flexDirection: `row`}}>
                    <View style={{flexDirection: `column`, justifyContent: `center`, alignItems: `center`, flex: 2}}>
                    <Ionicons name={`ios-flame`} size={60} color="#8ee2e2" style={{marginLeft: 20, marginRight: 20}}/>
                  </View>
                  <View style={{flexDirection: `column`, flex: 6, justifyContent: `center`}}>
                    <Text style={{margin: 10}}>{`This event has a high number of RSVPs, you should reserve a spot soon!`}</Text>
                  </View>
                  </View>}

                  {((new Date(event.date)) - new Date(Date.now()))/(1000 * 3600 * 24) < 7 &&
                  <View style={{flexDirection: `row`}}>
                    <View style={{flexDirection: `column`, justifyContent: `center`, alignItems: `center`, flex: 2}}>
                      <Ionicons name={`ios-time`} size={60} color="#8ee2e2" style={{marginLeft: 20, marginRight: 20, marginTop: 10}}/>
                    </View>
                    <View style={{flexDirection: `column`, flex: 6, justifyContent: `center`}}>
                      <Text style={{margin: 10}}>{`This event is happening within the next week`}</Text>
                    </View>
                  </View>}

                  {event.pastEvents > 40 &&
                  <View style={{flexDirection: `row`}}>
                    <View style={{flexDirection: `column`, justifyContent: `center`, alignItems: `center`, flex: 2}}>
                      <Ionicons name={`ios-pulse`} size={60} color="#8ee2e2" style={{marginLeft: 20, marginRight: 20, marginTop: 10}} />
                    </View>
                    <View style={{flexDirection: `column`, flex: 6, justifyContent: `center`}}>
                      <Text style={{margin: 10}}>{`This group has a consistent track record of events`}</Text>
                    </View>
                  </View>}

                  {findFood(event.description) > 0 &&
                  <View style={{flexDirection: `row`}}>
                    <View style={{flexDirection: `column`, justifyContent: `center`, alignItems: `center`, flex: 2}}>
                      <Ionicons name={`ios-pizza`} size={60} color="#8ee2e2" style={{marginLeft: 20, marginRight: 20, marginTop: 10}} />
                    </View>
                    <View style={{flexDirection: `column`, flex: 6, justifyContent: `center`}}>
                      <Text style={{margin: 10}}>{`Our algorithms suspect there may be food at this event`}</Text>
                    </View>
                  </View>}

                  {findBev(event.description) > 0 &&
                  <View style={{flexDirection: `row`}}>
                    <View style={{flexDirection: `column`, justifyContent: `center`, alignItems: `center`, flex: 2}}>
                      <Ionicons name={`ios-wine`} size={60} color="#8ee2e2" style={{marginLeft: 20, marginRight: 20, marginTop: 10}} />
                    </View>
                    <View style={{flexDirection: `column`, flex: 6, justifyContent: `center`}}>
                      <Text style={{margin: 10}}>{`Our algorithms suspect there may be booze at this event`}</Text>
                    </View>
                  </View>}
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
