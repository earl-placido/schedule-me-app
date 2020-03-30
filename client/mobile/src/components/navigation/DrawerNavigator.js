import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, FlatList} from 'react-native';
import {Button, Text, Icon} from 'native-base';

import {DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';

import StackNavigator from './StackNavigator';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/components/Auth.action';
import {GoogleSignin} from '@react-native-community/google-signin';

import {getGroupList} from '../../actions/screens/GroupList.action';

const Drawer = createDrawerNavigator();
const NUM_ITEMS = 3;

function CustomDrawerContent(props) {
  const [count, setCount] = useState(NUM_ITEMS);

  useEffect(() => {
    return props.navigation.addListener('state', () => {
      props.getGroupList();
      setCount(NUM_ITEMS);
    });
  }, [props.navigation]);

  return (
    <View style={styles.menuStyle}>
      <ScrollView>
        <DrawerItem
          labelStyle={styles.menuItemStyle}
          label="View Groups"
          icon={() => (
            <Icon type="AntDesign" name="bars" style={styles.menuItemStyle} />
          )}
          onPress={() => {
            props.navigation.push('Group List');
            props.navigation.navigate('Group List');
          }}
        />
        <FlatList
          data={props.groupList
            .concat()
            .sort((group1, group2) => {
              return group1.GroupName.localeCompare(group2.GroupName) > 0;
            })
            .slice(0, count)}
          renderItem={({item}) => (
            <DrawerItem
              labelStyle={styles.menuItemStyle}
              label={item.GroupName}
              onPress={() => {
                props.navigation.push('Group Detail', {
                  codeNum: item.GroupId,
                });
                props.navigation.navigate('Group Detail');
              }}
            />
          )}
        />
        {count < props.groupList.length && (
          <DrawerItem
            labelStyle={styles.menuItemStyle}
            label="... view more groups"
            onPress={() => {
              setCount(count + NUM_ITEMS);
            }}
          />
        )}
        <DrawerItem
          labelStyle={styles.menuItemStyle}
          label="Create Group"
          icon={() => (
            <Icon
              type="AntDesign"
              name="plussquareo"
              style={styles.menuItemStyle}
            />
          )}
          onPress={() => {
            props.navigation.push('Create Group');
            props.navigation.navigate('Create Group');
          }}
        />
        <DrawerItem
          labelStyle={styles.menuItemStyle}
          label="Join Group"
          icon={() => (
            <Icon
              type="AntDesign"
              name="plussquareo"
              style={styles.menuItemStyle}
            />
          )}
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
          setCount(NUM_ITEMS);
          props.navigation.dispatch(DrawerActions.closeDrawer());
          props.navigation.push('Group List');
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
    dispatch: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
  userName: PropTypes.any,
  logoutUser: PropTypes.func,
  groupList: PropTypes.array,
  getGroupList: PropTypes.func,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
  groupList: state.GroupListReducer.groupList,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  getGroupList: () => dispatch(getGroupList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);
