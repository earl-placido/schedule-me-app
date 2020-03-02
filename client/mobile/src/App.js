import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import {Container, Header, Content, Footer, Title} from 'native-base';
import CreateGroup from './components/screen/CreateGroup';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Reducers from './Reducers';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducers, {}, applyMiddleware(thunk))}>
        <Container>
          
          <Header/>
          <CreateGroup/>

          <Content>
          </Content>

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
