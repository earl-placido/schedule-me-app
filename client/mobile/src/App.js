import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Footer,
  Header,
  Root,
  StyleProvider,
  Title,
} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';

import DrawerNavigator from './navigation/DrawerNavigator';
import Home from './components/screens/LoginScreen';
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
          <StyleProvider style={getTheme(commonColor)}>
            <Container>
              <NavigationContainer>
                <AuthStack.Navigator
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
          </StyleProvider>
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
