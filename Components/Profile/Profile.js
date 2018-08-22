import React, { Component } from 'react';
import { Text, View, Button, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import { LinearGradient } from 'expo';

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
// const location = gql`
//   mutation Location($userId: ID) {
//     location(id: $userId) {
//       id
//       area
//     }
//   }
// `;

// <Button
//   onPress={() => location({ variables: { userId: userId }})}
// >Update City</Button>

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
                  <ScrollView>
                    <View style={styles.profileHeader}>
                      <View>
                        <Image
                          source={user.picUrl ? { uri: user.picUrl } : require(`../../resources/placeholder.png`)}
                          style={styles.profilePicture}  />
                      </View>
                    </View>
                    <View style={styles.profileTitleWrapper}>
                      <Text style={styles.profileName}>{user.nameFirst} {user.nameLast}</Text>
                      <Text>{user.area}</Text>
                    </View>

                  </ScrollView>
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
