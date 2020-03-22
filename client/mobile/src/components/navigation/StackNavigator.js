import React, {Component} from 'react';
import {Header, Button, Text, Icon, Left, Right} from 'native-base';

import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';

import CreateGroup from '../screens/CreateGroup/CreateGroup';
import GroupDetail from '../screens/GroupDetail/GroupDetail';
import GroupCode from '../screens/GroupCodeForm/GroupCodeForm';
import GroupList from '../screens/GroupList/GroupList';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/components/screens/Auth.action';

const Stack = createStackNavigator();

class StackNavigator extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName={'Group List'}
        screenOptions={{
          header: props => {
            return (
              <Header>
                {this.props.isAuthenticated ? (
                  <>
                    <Left>
                      <Button
                        transparent
                        onPress={() =>
                          props.navigation.dispatch(
                            DrawerActions.toggleDrawer(),
                          )
                        }>
                        <Icon name="menu" />
                      </Button>
                    </Left>

                    <Right>
                      <Button
                        onPress={() => {
                          props.navigation.navigate('Group List');
                        }}>
                        <Text>{this.props.userName}</Text>
                      </Button>
                    </Right>
                  </>
                ) : (
                  <></>
                )}
              </Header>
            );
          },
        }}>
        <Stack.Screen name="Create Group" component={CreateGroup} />
        <Stack.Screen
          name="Group Detail"
          component={GroupDetail}
          initialParams={{codeNum: -1}}
        />
        <Stack.Screen name="Group Code" component={GroupCode} />
        <Stack.Screen name="Group List" component={GroupList} />
      </Stack.Navigator>
    );
  }
}

StackNavigator.propTypes = {
  navigation: PropTypes.any,
  navigate: PropTypes.func,
  isAuthenticated: PropTypes.any,
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

export default connect(mapStateToProps, mapDispatchToProps)(StackNavigator);
