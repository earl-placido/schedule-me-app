import React, {Component} from 'react';
import {Alert, View, FlatList, StyleSheet, Text} from 'react-native';
import {Body, Container, Content, Card, CardItem, Button} from 'native-base';

import PropTypes from 'prop-types';

const userList = [
  {
    name: 'Renz Cabusas',
    role: 'Administrator',
  },
  {
    name: 'Brenna Epp',
    role: 'Member',
  },
  {
    name: 'Bonnie Tang',
    role: 'Member',
  },
  {
    name: 'Daryl Fung',
    role: 'Member',
  },
  {
    name: 'Winnie the Pooh',
    role: 'Honey Eater',
  },
  {
    name: 'Piglet',
    role: 'Moral Support',
  },
];

function DisplayUserDescription({title}) {
  return (
    <View>
      <Text style={{marginLeft: 5}}>{title}</Text>
    </View>
  );
}

export default class GroupDetail extends Component {
  render() {
    return (
      <Container style={styles.containerStyle}>
        <View style={{flexDirection: 'column'}}>
          <CardItem header>
            <Body>
              <Text style={({fontWeight: 'bold'}, {fontSize: 20})}>
                Group Equilibrium
              </Text>
              <Text style={{fontSize: 15}}>Optimal Time: 12pm - 2pm</Text>
              <Text style={{fontSize: 15}}>Optimal Date: October 26, 1985</Text>
            </Body>
          </CardItem>
        </View>

        <Content>
          <Card style={{flexDirection: 'column'}}>
            <FlatList
              showsHorizontalScrollIndicator={true}
              data={userList}
              renderItem={({item}) => (
                <CardItem boardered>
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
