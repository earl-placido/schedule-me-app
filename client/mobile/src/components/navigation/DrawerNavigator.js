import {Container, Content, Button, Text} from 'native-base';

import {DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {ScrollView} from 'react-native';

import CreateGroup from '../screens/CreateGroup/CreateGroup';
import GroupDetail from '../screens/GroupDetail/GroupDetail';
import GroupCode from './components/screens/GroupCodeForm/GroupCodeForm';
import GroupList from './components/screens/GroupList/GroupList';

import PropTypes from 'prop-types';

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

function CustomDrawerContent({navigation}) {
  return (
    <ScrollView>
      <DrawerItem
        label="Group Detail"
        onPress={() => {
          navigation.navigate('Group Detail');
        }}
      />
      <DrawerItem
        label="Create Group"
        onPress={() => {
          navigation.navigate('Create Group');
        }}
      />
      <DrawerItem
        label="Close"
        onPress={() => {
          navigation.closeDrawer();
        }}
      />
    </ScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
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

export default DrawerNavigator;

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
    closeDrawer: PropTypes.func.isRequired,
  }).isRequired,
};
