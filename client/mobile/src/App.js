import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Header, Footer, Title, Root} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DrawerNavigator from './components/navigation/DrawerNavigator';
import Home from './components/screens/Home/Home';

import {NativeRouter} from 'react-router-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from './actions/Auth.action';

const AuthStack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <Root>
        <NativeRouter>
          <Container>
            <NavigationContainer>
              <AuthStack.Navigator
                accessibilityLabel={'AuthStack'}
                initialRouteName={
                  !this.props.isAuthenticated ? 'Home' : 'Drawer'
                }>
                <AuthStack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    header: () => {
                      return <Header />;
                    },
                  }}
                />
                <AuthStack.Screen
                  name="Drawer"
                  component={DrawerNavigator}
                  options={{
                    header: () => {
                      return null;
                    },
                  }}
                />
              </AuthStack.Navigator>
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
