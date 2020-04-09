import React, {Component} from 'react';
import {Header, Button, Text, Icon, Left, Right} from 'native-base';

import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';

import CreateGroup from '../components/screens/CreateGroupScreen';
import GroupDetail from '../components/screens/GroupScreen';
import GroupCode from '../components/screens/JoinGroupScreen';
import GroupList from '../components/screens/GroupListScreen';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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
                        accessibilityLabel={'Menu'}
                        onPress={() =>
                          props.navigation.dispatch(
                            DrawerActions.toggleDrawer(),
                          )
                        }>
                        <Icon type="AntDesign" name="menuunfold" />
                      </Button>
                    </Left>

                    <Right>
                      <Button
                        transparent
                        onPress={() => {
                          props.navigation.navigate('Group List');
                        }}>
                        <Text accessibilityLabel={'HeaderUsername'}>
                          {this.props.userName}
                        </Text>
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
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
});

export default connect(mapStateToProps, {})(StackNavigator);
