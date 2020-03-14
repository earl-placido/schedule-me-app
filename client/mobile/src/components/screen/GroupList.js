import React, {Component} from 'react';

import {Text} from 'react-native';
import {Container, CardItem, Body, View} from 'native-base';

// const userList = [
//     {
//         GroupId: '1',
//         GroupName: 'Tallest Poppy',
//         GroupDescription: 'Hipster food',
//     },
//     {
//         GroupId: '2',
//         GroupName: 'Stellas',
//         GroupDescription: '#notMyStellas',
//     },
//     {
//         GroupId: '3',
//         GroupName: 'Dowon',
//         GroupDescription: 'Korean food',
//     },
// ];

export default class InputGroupCode extends Component {
  render() {
    return (
      <Container>
        <View style={{flexDirection: 'column'}}>
          <CardItem header>
            <Body>
              <Text style={({fontWeight: 'bold'}, {fontSize: 20})}>
                Group Equilibrium{' '}
              </Text>
              <Text style={{fontSize: 15}}>Optimal Time: 12pm - 2pm</Text>
              <Text style={{fontSize: 15}}>Optimal Date: October 26, 1985</Text>
            </Body>
          </CardItem>
        </View>
      </Container>
    );
  }
}
