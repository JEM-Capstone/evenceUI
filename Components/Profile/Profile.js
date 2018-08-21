import React, { Component } from 'react';
import {
  FlatList,
  ListItem,
  List,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { SafeAreaView } from 'react-navigation';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { findUser } from '../utils';

const userQuery = gql`
  query User($userId: ID) {
    user(id: $userId) {
      id
      email
      nameFirst
      nameLast
      industry
      headline
      picUrl
    }
  }
`;

class Profile extends Component {
  state = { userId: null };

  async componentDidMount() {
    const userId = await findUser();
    console.log('inside profile:', userId);
    this.setState({ userId: userId });
  }

  render() {
    console.log('this state in profile:', this.state.userId);
    return (
      <SafeAreaView style={styles.container}>
        {this.state.userId && (
          <Query query={userQuery} variables={{ userId: this.state.userId }}>
            {({ data: { user }, error, loading }) => {
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
                <View>
                  <ScrollView>
                    <Image
                      source={
                        user.picUrl
                          ? { uri: user.picUrl }
                          : require(`../../resources/user-placeholder.jpg`)
                      }
                      style={
                        user.picUrl
                          ? { height: 400, width: 400, alignSelf: `center` }
                          : {
                              alignSelf: `center`,
                              height: 400,
                              width: 400,
                              borderRadius: 50,
                            }
                      }
                      resizeMode="contain"
                    />
                    <View>
                      <Text>This is where you see your profile</Text>
                    </View>
                  </ScrollView>
                </View>
              );
            }}
          </Query>
        )}
      </SafeAreaView>
    );
  }
}

export default Profile;
