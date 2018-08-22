import React, { Component } from 'react';
import { FlatList, ListItem, List, Text, View, Button, Image } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { SafeAreaView } from 'react-navigation';
import styles from '../styles';
import Favoriting from './Favoriting'
import {findFood, findBev} from '../utils'
import Ionicons from 'react-native-vector-icons/Ionicons';

//userId will need to be a variable, depending on who is logged in
const allEventsQuery = gql`
  {
    events (userId: 1) {
      id
      eventName
      eventGroup
      date
      time
      eventCity
      photo
      venueName
      favorite
      rsvps
      pastEvents
      description
    }
  }
`;


class AllEvents extends Component {
  render() {
    const { navigation: { navigate, push } } = this.props;
    return (
        <SafeAreaView style={styles.container}>
          <View>
            <Query query={allEventsQuery}>
              {({ data: { events }, error, loading }) => {
                if (error) return (<View><Text>There was an error</Text></View>)
                if (loading) return (<View><Text>Loading the data</Text></View>)
                return (<FlatList
                  data={events}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.infoBox}>
                      <View>
                        <Image
                          source={item.photo ? { uri: item.photo } : require(`../../resources/calendar.png`)}
                          style={item.photo ? { flex: 1, height: 180 } : { flex: 1, height: 180, alignSelf: `center`}  }
                          resizeMode="contain"
                        />

                        <Favoriting eventId={item.id} favorite={item.favorite}/>

                      </View>
                      <View>
                        <View style={{marginTop: 10, marginBottom: 3, flexDirection: `row`}}>
                          {item.rsvps > 20 &&
                          <Ionicons name={`ios-flame`} size={40} color="#8ee2e2" style={{marginRight: 20}} />}

                          {((new Date(item.date)) - new Date(Date.now()))/(1000 * 3600 * 24) < 7 &&
                          <Ionicons name={`ios-time`} size={40} color="#8ee2e2" style={{marginRight: 20}}/>}

                          {item.pastEvents > 40 &&
                          <Ionicons name={`ios-pulse`} size={40} color="#8ee2e2" style={{marginRight: 20}} />}

                          {findFood(item.description) > 0 &&
                          <Ionicons name={`ios-pizza`} size={40} color="#8ee2e2" style={{marginRight: 20}} />}

                          {findBev(item.description) > 0 &&
                          <Ionicons name={`ios-wine`} size={40} color="#8ee2e2" style={{marginRight: 20}} />}
                        </View>
                        <Text style={{fontSize: 15}}>
                          <Text style={styles.header} onPress={() => push(`SingleEvent`, {eventId: item.id} )}>
                            {`${item.eventName}`}</Text>
                          {`\nGroup: ${item.eventGroup}`}
                          {`\nDate: ${item.date} | Time: ${item.time}`}
                          {`\n${item.eventCity}`}
                          {`\nVenue: ${item.venueName}`}
                        </Text>
                      </View>
                    </View>
                  )}
                />)
              }}
            </Query>
          </View>
        </SafeAreaView>
    );
  }
}

export default AllEvents;
