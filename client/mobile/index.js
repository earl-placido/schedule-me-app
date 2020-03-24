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
import {PersistGate} from 'redux-persist/integration/react';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  blacklist: ['CreateGroup'],
};
const store = createStore(
  persistReducer(config, Reducers),
  {},
  applyMiddleware(thunk),
);
const persistor = persistStore(store, async () => {
  const isAuthenticated = (await AsyncStorage.getItem('isAuthenticated'))
    ? true
    : false;
  const token = await AsyncStorage.getItem('token');
  const userName = await AsyncStorage.getItem('userName');

  this.setState({
    isAuthenticated: isAuthenticated,
    token: token,
    userName: userName,
  });
});

console.disableYellowBox = true;

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Root);
