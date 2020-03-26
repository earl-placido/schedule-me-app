import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, FlatList} from 'react-native';
import {Button, Text} from 'native-base';

import {DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';

import StackNavigator from './StackNavigator';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/components/Auth.action';
import {GoogleSignin} from '@react-native-community/google-signin';

const Drawer = createDrawerNavigator();
const NUM_ITEMS = 3;

const groupList = [
  {
    GroupId: '1',
    GroupName: 'Tallest Poppy',
    GroupDescription: 'Hipster food',
  },
  {
    GroupId: '2',
    GroupName: 'Stellas',
    GroupDescription: '#notMyStellas',
  },
  {
    GroupId: '3',
    GroupName: 'Dowon',
    GroupDescription: 'Korean food',
  },
  {
    GroupId: '1',
    GroupName: 'Tallest Poppy',
    GroupDescription: 'Hipster food',
  },
  {
    GroupId: '2',
    GroupName: 'Stellas',
    GroupDescription: '#notMyStellas',
  },
  {
    GroupId: '3',
    GroupName: 'Dowon',
    GroupDescription: 'Korean food',
  },
  {
    GroupId: '1',
    GroupName: 'Tallest Poppy',
    GroupDescription: 'Hipster food',
  },
  {
    GroupId: '2',
    GroupName: 'Stellas',
    GroupDescription: '#notMyStellas',
  },
  {
    GroupId: '3',
    GroupName: 'Dowon',
    GroupDescription: 'Korean food',
  },
];

class CustomDrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: NUM_ITEMS,
    };
  }

  render() {
    return (
      <View style={styles.menuStyle}>
        <ScrollView>
          <DrawerItem
            labelStyle={{
              ...styles.menuItemStyle,
              fontWeight: 'bold',
              fontSize: 30,
            }}
            label="View Groups"
            onPress={() => {
              this.props.navigation.navigate('Group List');
            }}
          />
          <FlatList
            data={groupList
              .sort((group1, group2) => {
                return group1.GroupName.localeCompare(group2.GroupName) > 0;
              })
              .slice(0, this.state.items)}
            renderItem={({item}) => (
              <DrawerItem
                labelStyle={styles.menuItemStyle}
                label={item.GroupName}
                onPress={() => {
                  this.props.navigation.navigate('Group Detail', {
                    codeNum: item.GroupId,
                  });
                }}
              />
            )}
          />
          {this.state.items < groupList.length && (
            <DrawerItem
              labelStyle={styles.menuItemStyle}
              label="..."
              onPress={() => {
                this.setState(prev => ({items: prev.items + NUM_ITEMS}));
              }}
            />
          )}
          <DrawerItem
            labelStyle={styles.menuItemStyle}
            label="&#x2295; Create Group"
            onPress={() => {
              this.props.navigation.push('Create Group');
              this.props.navigation.navigate('Create Group');
            }}
          />
          <DrawerItem
            labelStyle={styles.menuItemStyle}
            label="&#x2295; Join Group"
            onPress={() => {
              this.props.navigation.navigate('Group Code');
            }}
          />
        </ScrollView>
        <Button
          light
          style={styles.logoutStyle}
          onPress={() => {
            GoogleSignin.revokeAccess();
            GoogleSignin.signOut();
            this.props.logoutUser();
            this.props.navigation.dispatch(DrawerActions.closeDrawer());
            this.props.navigation.navigate('Home');
          }}>
          <Text>Log out</Text>
        </Button>
      </View>
    );
  }
}

class DrawerNavigator extends Component {
  render() {
    return (
      <Drawer.Navigator
        drawerContent={() => <CustomDrawerContent {...this.props} />}
        initialRouteName={'Stack'}>
        <Drawer.Screen name="Stack" component={StackNavigator} />
      </Drawer.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  menuStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#3F51B5',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuItemStyle: {
    color: 'white',
    fontSize: 20,
  },
  logoutStyle: {
    justifyContent: 'center',
    marginHorizontal: 50,
  },
});

CustomDrawerContent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  userName: PropTypes.any,
  logoutUser: PropTypes.func,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);
