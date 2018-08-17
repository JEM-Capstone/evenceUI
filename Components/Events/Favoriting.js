import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import {
  Text, View, Button, Image
} from 'react-native';
import styles from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';


const favoriteEvent = gql`
  mutation FavoriteEvent($eventId: ID) {
    favoriteEvent(id: $eventId){
      id
      favorite
    }
  }
`

class Favoriting extends Component {
  render() {
    const { eventId, favorite } = this.props
    return (
      <View style={{margin: 10, position: `absolute`, left: `83%`}}>
        <Mutation mutation={favoriteEvent}>
          {(favoriteEvent, { data, error, loading }) => {
            if (error) return (<Text>error</Text>)
            if (loading) return (<Ionicons name="ios-heart" size={40} color="pink" />)
            return (
            <Ionicons
              name={favorite ? `ios-heart` : `ios-heart-outline`}
              size={40}
              color="#ed3899"
              onPress={() => favoriteEvent({ variables: {eventId: eventId }})}
            />
            )
          }}
          </Mutation>
      </View>
    )
  }
}

export default Favoriting
