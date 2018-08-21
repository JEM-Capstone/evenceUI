import React, { Component } from 'react';
import {
  FlatList,
  ListItem,
  List,
  Text,
  View,
  Button,
  Image,
} from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { SafeAreaView } from 'react-navigation';
import styles from '../styles';
import Favoriting from './Favoriting';

//userId will need to be a variable, depending on who is logged in
const allEventsQuery = gql`
  {
    events(userId: 1) {
      id
      eventName
      eventGroup
      date
      time
      eventCity
      photo
      venueName
      favorite
    }
  }
`;

//Note to evelyn: you need to sort the data array (by date!) b4 render so it doesn't keep reordering
class AllEvents extends Component {
  render() {
    const {
      navigation: { navigate, push },
    } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Query query={allEventsQuery}>
            {({ data: { events }, error, loading }) => {
              if (error)
                return (
                  <View>
                    <Text>There was an error</Text>
                  </View>
                );
              if (loading)
                return (
                  <View>
                    <Text>Loading the data</Text>
                  </View>
                );
              return (
                <FlatList
                  data={events}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({ item }) => (
                    <View>
                      <View>
                        <Image
                          source={
                            item.photo
                              ? { uri: item.photo }
                              : require(`../../resources/calendar.png`)
                          }
                          style={
                            item.photo
                              ? { flex: 1, height: 200 }
                              : { flex: 1, height: 200, alignSelf: `center` }
                          }
                          resizeMode="contain"
                        />

                        <Favoriting
                          eventId={item.id}
                          favorite={item.favorite}
                        />
                      </View>
                      <View style={styles.listText}>
                        <Text
                          style={styles.header}
                          onPress={() =>
                            push(`SingleEvent`, { eventId: item.id })
                          }
                        >
                          {`Event: ${item.eventName}`}
                        </Text>

                        <Text>{`Group: ${item.eventGroup}`}</Text>
                        <Text>{`Date: ${item.date} | Time: ${item.time}`}</Text>
                        <Text>{item.eventCity}</Text>
                        <Text>{`Venue: ${item.venueName}`}</Text>
                        <Text />
                      </View>
                    </View>
                  )}
                />
              );
            }}
          </Query>
        </View>
      </SafeAreaView>
    );
  }
}

export default AllEvents;
