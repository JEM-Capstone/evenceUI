import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import {
  FlatList, ListItem, List, Text, View, Button, Image,
} from 'react-native';
import styles from '../styles';


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
    }
  }
`;


class FetchAllEvents extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return (<Text>Loading...</Text>);
    }
    const { events } = this.props.data;
    console.log(events);
    return (
      <View>
        <FlatList
          data={events}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <View>
              <View>
                <Image
                  source={item.photo ? { uri: item.photo } : require(`../../resources/placeholder.png`)}
                  style={{ flex: 1, height: 200 }}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.listText}>
                <Text style={styles.header}>{`Event: ${item.eventName}`}</Text>
                <Text>{`Group: ${item.eventGroup}`}</Text>
                <Text>{`Date: ${item.date} | Time: ${item.time}`}</Text>
                <Text>{item.eventCity}</Text>
                <Text>{`Venue: ${item.venueName}`}</Text>
                <Text />
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

export default graphql(allEventsQuery)(FetchAllEvents);
