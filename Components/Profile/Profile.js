import React, { Component } from 'react';
import { FlatList, ListItem, List, Text, View, Button, Image, ScrollView } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { SafeAreaView } from 'react-navigation';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

//userId will need to be a variable, depending on who is logged in...
/*
query User($userId: ID){
   user(id: $userId) {

  && ADD variables={{userId} to the <Query>
*/
const userQuery = gql`
  {
    user(id: 1) {
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
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Query query={userQuery}>
          {({ data: { user }, error, loading }) => {
            if (error) return (<View><Text>There was an error</Text></View>)
            if (loading) return (<View><Text>Loading the data</Text></View>)
            return (
              <View>
                <ScrollView>
                  <Image
                    source={user.picUrl ? { uri: user.picUrl } : require(`../../resources/user-placeholder.jpg`)}
                    style={user.picUrl ? { height: 400, width: 400, alignSelf: `center` } : {alignSelf: `center`, height: 400, width: 400, borderRadius: 50}}
                    resizeMode="contain"
                  />
                  <View>
                    <Text>This is where you see your profile</Text>
                  </View>
                </ScrollView>
              </View>
            )
          }}
        </Query>
      </SafeAreaView>
    );
  }
}

export default Profile;
