import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Button, Text} from 'native-base';

import {DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';

import StackNavigator from './StackNavigator';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/components/screens/Auth.action';

import {GoogleSignin} from '@react-native-community/google-signin';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <View style={styles.menuStyle}>
      <ScrollView>
        <DrawerItem
          labelStyle={{
            ...styles.menuItemStyle,
            fontWeight: 'bold',
            fontSize: 24,
          }}
          label="Groups"
          onPress={() => {
            props.navigation.navigate('Group List');
          }}
        />
        <DrawerItem
          labelStyle={styles.menuItemStyle}
          label="&#x2295; Create Group"
          onPress={() => {
            props.navigation.navigate('Create Group');
          }}
        />
        <DrawerItem
          labelStyle={styles.menuItemStyle}
          label="&#x2295; Join Group"
          onPress={() => {
            props.navigation.navigate('Group Code');
          }}
        />
      </ScrollView>
      <Button
        light
        style={styles.logoutStyle}
        onPress={() => {
          GoogleSignin.revokeAccess();
          GoogleSignin.signOut();
          props.logoutUser();
          props.navigation.navigate('Home');
        }}>
        <Text>Log out</Text>
      </Button>
    </View>
  );
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
