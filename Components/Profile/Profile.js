import React, { Component } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';

const userQuery = gql`
  query User($linkedinId: String){
    user(linkedinId: $linkedinId) {
      id
      email
      nameFirst
      nameLast
      industry
      linkedinId
      headline
      area
      picUrl
    }
  }
`;


class Profile extends Component {

  render() {
    return (
      <SafeAreaView style={styles.profileWrapper}>
        <View>
          <Query query={userQuery} variables={{linkedinId: 'WhHtuuRnPp'}}>
            {({ data: { user }, error, loading }) => {
              if (error) return (<View><Text>There was an error: </Text></View>)
              if (loading) return (<View><Text>Loading</Text></View>)
              console.log('the user', user)
              return (
                <View >
                  <Image
                    source={user.picUrl ? { uri: user.picUrl } : require(`../../resources/placeholder.png`)}
                    style={styles.profilePicture}  />
                  <Text>{user.nameFirst} {user.nameLast}</Text>
                  <Text>{user.picUrl}</Text>

                </View>
              )
            }}
          </Query>
        </View>
      </SafeAreaView>
    );
  }
}

export default Profile;
