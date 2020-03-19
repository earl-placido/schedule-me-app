import {DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import CreateGroup from '../screens/CreateGroup/CreateGroup';
import GroupDetail from '../screens/GroupDetail/GroupDetail';
import GroupCode from '../screens/GroupCodeForm/GroupCodeForm';
import GroupList from '../screens/GroupList/GroupList';

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
        initialRouteName={'Create Group'}>
        <Drawer.Screen name="Create Group" component={CreateGroup} />
        <Drawer.Screen
          name="Group Detail"
          component={GroupDetail}
          initialParams={{codeNum: -1}}
        />
        <Drawer.Screen name="Group Code" component={GroupCode} />
        <Drawer.Screen name="Group List" component={GroupList} />
      </Drawer.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  menuStyle: {
    backgroundColor: '#3F51B5',
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
