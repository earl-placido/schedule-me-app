import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Footer,
  Content,
  Title,
  Button,
  Text,
  Root,
} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CreateGroup from './components/screens/CreateGroup/CreateGroup';
import GroupDetail from './components/screens/GroupDetail/GroupDetail';
import GroupCode from './components/screens/GroupCodeForm/GroupCodeForm';
import GroupList from './components/screens/GroupList/GroupList';
import Home from './components/screens/Home/Home';

import {NativeRouter} from 'react-router-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from './actions/components/Auth.action';

import {GoogleSignin} from '@react-native-community/google-signin';

const Stack = createStackNavigator();

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

class App extends Component {
  render() {
    return (
      <Root>
        <NativeRouter>
          <Container>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={
                  !this.props.isAuthenticated ? 'Home' : 'Create Group'
                }
                screenOptions={{
                  header: props => {
                    return (
                      <Header>
                        {this.props.isAuthenticated ? (
                          <Button
                            onPress={() => {
                              GoogleSignin.revokeAccess();
                              GoogleSignin.signOut();
                              this.props.logoutUser();
                              props.navigation.navigate('Home');
                            }}>
                            <Text>{this.props.userName}</Text>
                          </Button>
                        ) : (
                          <></>
                        )}
                      </Header>
                    );
                  },
                }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen
                  name="Create Group"
                  component={CreateGroupScreen}
                />
                <Stack.Screen
                  name="Group Detail"
                  component={GroupDetail}
                  initialParams={{codeNum: -1}}
                />
                <Stack.Screen name="Group Code" component={GroupCode} />
                <Stack.Screen name="Group List" component={GroupList} />
              </Stack.Navigator>
            </NavigationContainer>

            <Footer style={styles.footerStyle}>
              <Title>schedule-me-up</Title>
            </Footer>
          </Container>
        </NativeRouter>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  footerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

App.propTypes = {
  navigation: PropTypes.any,
  navigate: PropTypes.func,
  isAuthenticated: PropTypes.any,
  userName: PropTypes.any,
  logoutUser: PropTypes.func,
};

CreateGroupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
