import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import {Container, Header, Footer, Title} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './components/screen/Main';
import CreateGroup from './components/screen/CreateGroup';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Reducers from './Reducers';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducers, {}, applyMiddleware(thunk))}>
        <Container>
          <Header/>

          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="CreateGroup" component={CreateGroup} />
            </Stack.Navigator>
          </NavigationContainer>

          <Footer style = {styles.footerStyle}>
              <Title>schedule-me-up</Title>
          </Footer>
        </Container>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  footerStyle: {
    padding: 10
  }
});
