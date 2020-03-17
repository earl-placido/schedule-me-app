import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Footer,
  Title,
  Button,
  Text,
  Root,
  Icon,
  Left,
  Right,
} from 'native-base';

import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DrawerNavigator from './components/navigation/DrawerNavigator';
import Home from './components/screens/Home/Home';

import {NativeRouter} from 'react-router-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from './actions/components/screens/Auth.action';

import {GoogleSignin} from '@react-native-community/google-signin';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <Root>
        <NativeRouter>
          <Container>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={
                  !this.props.isAuthenticated ? 'Home' : 'Drawer'
                }
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

                            <Button
                              onPress={() => {
                                GoogleSignin.revokeAccess();
                                GoogleSignin.signOut();
                                this.props.logoutUser();
                                props.navigation.navigate('Home');
                              }}>
                              <Text>{this.props.userName}</Text>
                            </Button>

                            <Right />
                          </>
                        ) : (
                          <></>
                        )}
                      </Header>
                    );
                  },
                }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Drawer" component={DrawerNavigator} />
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
