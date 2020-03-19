import {Container, Content, Button, Text} from 'native-base';

import {DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';

import CreateGroup from '../screens/CreateGroup/CreateGroup';
import GroupDetail from '../screens/GroupDetail/GroupDetail';
import GroupCode from '../screens/GroupCodeForm/GroupCodeForm';
import GroupList from '../screens/GroupList/GroupList';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/components/screens/Auth.action';

import {GoogleSignin} from '@react-native-community/google-signin';

const Drawer = createDrawerNavigator();

function CreateGroupScreen({navigation}) {
  return (
    <Container>
      <Button onPress={() => navigation.navigate('Group Code')}>
        <Text>Go to group code screen</Text>
      </Button>
      <Button onPress={() => navigation.navigate('Group List')}>
        <Text>Go to group list screen</Text>
      </Button>
      <CreateGroup />
      <Content />
    </Container>
  );
}

function GroupDetailScreen({navigation}) {
  return (
    <Container>
      <Button onPress={() => navigation.navigate('Create Group')}>
        <Text>Go to create group</Text>
      </Button>
      <GroupDetail />
      <Content />
    </Container>
  );
}

function CustomDrawerContent(props) {
  return (
    <ScrollView>
      <DrawerItem
        label="Groups"
        onPress={() => {
          props.navigation.navigate('Group List');
        }}
      />
      <DrawerItem
        label="Create Group"
        onPress={() => {
          props.navigation.navigate('Create Group');
        }}
      />
      <DrawerItem
        label="Join Group"
        onPress={() => {
          props.navigation.navigate('Group Code');
        }}
      />
      <DrawerItem
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
        <Drawer.Screen name="Create Group" component={CreateGroupScreen} />
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

CreateGroupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

GroupDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

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
