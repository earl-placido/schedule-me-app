import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import {DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';

import StackNavigator from './StackNavigator';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/components/screens/Auth.action';

import {GoogleSignin} from '@react-native-community/google-signin';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <ScrollView style={styles.menuStyle}>
      <DrawerItem
        labelStyle={styles.menuItemStyle}
        label="Groups"
        onPress={() => {
          props.navigation.navigate('Group List');
        }}
      />
      <DrawerItem
        labelStyle={styles.menuItemStyle}
        label="Create Group"
        onPress={() => {
          props.navigation.navigate('Create Group');
        }}
      />
      <DrawerItem
        labelStyle={styles.menuItemStyle}
        label="Join Group"
        onPress={() => {
          props.navigation.navigate('Group Code');
        }}
      />
      <DrawerItem
        labelStyle={styles.menuItemStyle}
        label="Log out"
        onPress={() => {
          GoogleSignin.revokeAccess();
          GoogleSignin.signOut();
          props.logoutUser();
          props.navigation.navigate('Home');
        }}
      />
    </ScrollView>
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
    backgroundColor: '#3F51B5',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuItemStyle: {
    color: 'white',
    fontSize: 20,
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
