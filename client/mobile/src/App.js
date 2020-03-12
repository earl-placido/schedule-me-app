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
} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './components/screen/Main';
import CreateGroup from './components/screen/CreateGroup';
import GroupDetail from './components/screen/GroupDetail';

import {NativeRouter} from 'react-router-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from './actions/components/screens/Auth.action';

import {GoogleSignin} from '@react-native-community/google-signin';

const Stack = createStackNavigator();

function DetailsScreen({navigation}) {
  return (
    <Container>
      <Button
        title="Go to group details"
        onPress={() => navigation.navigate('Group Detail')}
      />
      <CreateGroup />
      <Content />
    </Container>
  );
}

function HomeScreen({navigation}) {
  return (
    <Container>
      <Button
        title="Go to create group"
        onPress={() => navigation.navigate('Create Group')}
      />
      <GroupDetail />
      <Content />
    </Container>
  );
}

class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Container>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={
                !this.props.isAuthenticated ? 'Main' : 'CreateGroup'
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
                            props.navigation.navigate('Main');
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
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="GroupDetail" component={GroupDetail} />
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

DetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

HomeScreen.propTypes = {
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
