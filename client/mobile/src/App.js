import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Header, Content, Title} from 'native-base';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Reducers from './Reducers';
import GroupDetail from './components/screen/GroupDetail';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducers, {}, applyMiddleware(thunk))}>
        <Container>
          <Header style={styles.headerStyle}>
            <Title>schedule-me-up</Title>
          </Header>
          <GroupDetail />

          <Content />
        </Container>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    padding: 0,
  },
});
