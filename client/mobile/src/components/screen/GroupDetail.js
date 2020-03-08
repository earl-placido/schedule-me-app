import React, {Component} from 'react';
import {Left, Body, Button, CardItem, Card} from 'native-base';
import {Image, FlatList, StyleSheet, Text, View} from 'react-native';

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

export default class GroupDetail extends Component {
  keyExtractor = (item, index) => index.tostring + item.name;

  render() {
    return (
      <View style={{flex: 1}}>
        <Card>
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
            keyExtractor={this.keyExtractor}
            renderItem={({item}) => {
              {
                return (
                  <View>
                    <CardItem bordered>
                      <Left>
                        <Image
                          style={{resizeMode: 'cover', width: 50, height: 50}}
                          source={{uri: 'https://reactjs.org/logo-og.png'}}
                        />
                        <Body>
                          <Text>{item.name}</Text>
                          <Text>{item.role}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                  </View>
                );
              }
            }}
          />
        </Card>

        <View style={styles.viewCenter}>
          <Button primary style={styles.buttonStyle}>
            <Text style={{color: 'white'}}> Input Your Availability </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 20,
    padding: 20,
  },

  viewCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
