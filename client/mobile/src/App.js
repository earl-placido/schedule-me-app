import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
import {Container, Header, Content, Footer, Title} from 'native-base';
import CreateGroup from './components/screen/CreateGroup';

export default class App extends Component {
  render() {
    return (
      <Container>
        
        <Header/>
        <CreateGroup/>

        <Content>
        </Content>

        <Footer style = {styles.footerStyle}>
            <Title>schedule-me-up</Title>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  footerStyle: {
    padding: 10
  }
});