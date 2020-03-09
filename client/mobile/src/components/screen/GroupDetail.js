import React, {Component} from 'react';
import {Alert, Image, View, FlatList, StyleSheet, Text} from 'react-native';
import {Body, Container, Content, Card, CardItem, Button} from 'native-base';

import PropTypes from 'prop-types';

const userList = [
  {
    name: 'Renz Cabusas',
    role: 'Administrator',
    profilePic: 'https://reactjs.org/logo-og.png',
  },
  {
    name: 'Brenna Epp',
    role: 'Member',
    profilePic: 'https://reactjs.org/logo-og.png',
  },
  {
    name: 'Bonnie Tang',
    role: 'Member',
    profilePic: 'https://reactjs.org/logo-og.png',
  },
  {
    name: 'Daryl Fung',
    role: 'Member',
    profilePic: 'https://reactjs.org/logo-og.png',
  },
  {
    name: 'Winnie the Pooh',
    role: 'Honey Eater',
    profilePic: 'https://reactjs.org/logo-og.png',
  },
  {
    name: 'Piglet',
    role: 'Moral Support',
    profilePic: 'https://reactjs.org/logo-og.png',
  },
];

function DisplayUserDescription({title}) {
  return (
    <View>
      <Text style={{marginLeft: 10}}>{title}</Text>
    </View>
  );
}

export default class GroupDetail extends Component {
  render() {
    return (
      <Container style={styles.containerStyle}>
        <Content>
          <Card style={{flexDirection: 'column'}}>
            <CardItem header bordered>
              <Body>
                <Text style={({fontWeight: 'bold'}, {fontSize: 20})}>
                  Group Equilibrium
                </Text>
                <Text style={{fontSize: 15}}>
                  Optimal Time: 12pm - 2pm on October 26, 1985
                </Text>
              </Body>
            </CardItem>

            <FlatList
              showsHorizontalScrollIndicator={true}
              data={userList}
              renderItem={({item}) => (
                <CardItem boardered>
                  <Image
                    style={{resizeMode: 'cover', width: 50, height: 50}}
                    resizeMode={'cover'}
                    source={{uri: item.profilePic}}
                  />
                  <Body>
                    <DisplayUserDescription title={item.name} />
                    <DisplayUserDescription title={item.role} />
                  </Body>
                </CardItem>
              )}
              keyExtractor={item => item.id}
            />
          </Card>
        </Content>

        <View style={styles.viewCenter}>
          <Button
            style={styles.buttonStyle}
            onPress={() => Alert.alert('Functionality to come')}>
            <Text style={{color: 'white'}}>Input Your Availability</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 5,
  },
  buttonStyle: {
    marginTop: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

DisplayUserDescription.propTypes = {
  title: PropTypes.string.isRequired,
};
