import {FloatingAction} from 'react-native-floating-action';
import Dialog from 'react-native-dialog';

import React, {Component} from 'react';
import {Alert, View, FlatList, StyleSheet, Text} from 'react-native';
import {Body, Container, Content, Card, CardItem, Icon} from 'native-base';

const userList = [
  {
    UserFName: 'Renz',
    UserLName: 'Cabusas',
    UserEmail: 'renzCabusas@gmail.com',
  },
  {
    UserFName: 'Brenna',
    UserLName: 'Epp',
    UserEmail: 'brennaEpp@gmail.com',
  },
  {
    UserFName: 'Bonnie',
    UserLName: 'Tang',
    UserEmail: 'bonnieTang@gmail.com',
  },
  {
    UserFName: 'Daryl',
    UserLName: 'Fung',
    UserEmail: 'darylFung@gmail.com',
  },
  {
    UserFName: 'Jennifer',
    UserLName: 'Seo',
    UserEmail: 'jenniferSeo@gmail.com',
  },
  {
    UserFName: 'Winnie',
    UserLName: 'The Pooh',
    UserEmail: 'poo@gmail.com',
  },
];

const actions = [
  {
    text: 'Input Your Availability',
    icon: require('../../assets/personIcon.png'),
    name: 'inputAvalibility',
    position: 1,
  },
];

export default class GroupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      currUser: {
        UserFName: 'INVALID USER',
        UserLName: 'INVALID USER',
        UserEmail: 'INVALID USER',
      },
    };
  }
  showDialog(user) {
    //Alert.alert(user);
    this.setState({currUser: user, dialogVisible: true});
  }

  handleClose = () => {
    this.setState({dialogVisible: false});
  };

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
                <View>
                  <CardItem
                    header
                    bordered
                    button
                    onPress={() => this.showDialog(item)}>
                    <Body>
                      <Text style={{marginLeft: 5}}>
                        {item.UserFName} {item.UserLName}
                      </Text>
                    </Body>
                  </CardItem>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </Card>
        </Content>

        <FloatingAction
          actions={actions}
          onPressItem={({item}) => {
            console.log(`Selected button: ${item}`);
            Alert.alert('Functionality to come');
          }}
        />

        <Dialog.Container
          onBackdropPress={this.handleClose}
          visible={this.state.dialogVisible}>
          <Icon
            style={{padding: 10, position: 'absolute', right: 10}}
            type="FontAwesome"
            name="close"
            onPress={this.handleClose}
          />

          <Dialog.Title
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
              fontWeight: 'bold',
            }}>
            {this.state.currUser.UserFName}
          </Dialog.Title>

          <Dialog.Description>
            <Text style={{fontWeight: 'bold'}}>Full Name: </Text>{' '}
            {this.state.currUser.UserFName} {this.state.currUser.UserLName}{' '}
            {'\n'}
            <Text style={{fontWeight: 'bold'}}>Email: </Text>
            {this.state.currUser.UserEmail}
          </Dialog.Description>
          <Dialog.Button label="ChangeAvailability" />
        </Dialog.Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 6,
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
