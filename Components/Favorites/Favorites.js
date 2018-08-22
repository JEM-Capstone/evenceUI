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
import { findUser } from '../utils';

//userId will need to be a variable, depending on who is logged in
const allEventsQuery = gql`
  query User($userId: ID) {
    events(userId: $userId) {
      id
      eventName
      date
      time
      photo
      favorite
    }
  }
`;

class Favorites extends Component {
  state = { userId: null };

  async componentDidMount() {
    const userId = await findUser();
    console.log('inside favorites', userId);
    this.setState({ userId: userId });
  }

  render() {
    const {
      navigation: { navigate, push },
    } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          {this.state.userId && (
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
                    renderItem={({ item }) => {
                      if (item.favorite) {
                        return (
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
                                    : {
                                        flex: 1,
                                        height: 200,
                                        alignSelf: `center`,
                                      }
                                }
                                resizeMode="contain"
                              />
                            </View>
                            <View style={styles.favsList}>
                              <Text
                                style={styles.header}
                                onPress={() =>
                                  push(`SingleEvent`, { eventId: item.id })
                                }
                              >
                                {`${item.eventName}`}
                              </Text>
                              <Text style={{ color: `#e25a9e` }}>{`Date: ${
                                item.date
                              } | Time: ${item.time}`}</Text>
                              <Text />
                            </View>
                          </View>
                        );
                      }
                    }}
                  />
                );
              }}
            </Query>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default Favorites;
