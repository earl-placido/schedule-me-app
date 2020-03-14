import React, {Component} from 'react';

import {StyleSheet, Text} from 'react-native';
import {Container, Form, Item, Input, Button, View} from 'native-base';

export default class InputGroupCode extends Component {
  render() {
    return (
      <Container style={styles.screenCenterStyle}>
        <View style={styles.titleStyle}>
          <Text style={{padding: 10, fontWeight: 'bold', fontSize: 25}}>
            Enter Group Code
          </Text>
        </View>

        <Form style={{width: '50%'}}>
          <Item regular style={styles.screenCenterStyle}>
            <Input
              style={styles.formInputText}
              placeholderTextColor="lightgrey"
              textAlign={'center'}
              placeholder="XXXXXX"
            />
          </Item>
        </Form>

        <View style={{padding: 15}}>
          <Button rounded style={(styles.buttonStyle, {padding: 15})}>
            <Text style={{color: 'white'}}> Continue </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  screenCenterStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleStyle: {
    width: '70%',
    alignItems: 'center',
  },
});
