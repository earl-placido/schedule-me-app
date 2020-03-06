import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Header, Footer, Title, Button, Text} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './components/screen/Main';
import CreateGroup from './components/screen/CreateGroup';

import {NativeRouter} from 'react-router-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutGoogle} from './actions/components/screens/Auth.action';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Container>
          <Header>
            {this.props.isAuthenticated ? (
              <Button onPress={this.props.logoutGoogle}>
                <Text>{this.props.userName}</Text>
              </Button>
            ) : (
              <></>
            )}
          </Header>

          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName={
                !this.props.isAuthenticated ? 'Main' : 'CreateGroup'
              }>
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="CreateGroup" component={CreateGroup} />
            </Stack.Navigator>
          </NavigationContainer>

          <Footer style={styles.footerStyle}>
            <Title>schedule-me-up</Title>
          </Footer>
        </Container>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  footerStyle: {
    padding: 10,
  },
});

App.propTypes = {
  navigation: PropTypes.any,
  navigate: PropTypes.func,
  isAuthenticated: PropTypes.any,
  userName: PropTypes.any,
  logoutGoogle: PropTypes.func,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.userName,
});

const mapDispatchToProps = dispatch => ({
  logoutGoogle: () => dispatch(logoutGoogle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
