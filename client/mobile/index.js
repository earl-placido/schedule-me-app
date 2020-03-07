/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Reducers from './src/Reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};
const store = createStore(
  persistReducer(config, Reducers),
  {},
  applyMiddleware(thunk),
);
persistStore(store, async () => {
  const isAuthenticated = (await AsyncStorage.getItem('isAuthenticated'))
    ? true
    : false;
  const token = await AsyncStorage.getItem('token');
  const userName = await AsyncStorage.getItem('userName');
  const displayPicURL = await AsyncStorage.getItem('displayPicURL');

  this.setState({
    isAuthenticated: isAuthenticated,
    token: token,
    userName: userName,
    displayPicURL: displayPicURL,
  });
});

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Root);
