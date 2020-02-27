import React, { Component } from 'react';
import {TextInput, View, StyleSheet } from 'react-native';

import {Content} from 'native-base';

export default class GroupMeetingForm extends Component {
  render() {
    return (
      <Content padder>
        <View>
          <View style={{padding: 10}}>
            <TextInput 
              placeholder = "Duration"
              keyboardType = {"numeric"}
              style={styles.textInputStyle}
            />
          </View>
          <View style={{padding: 10}}>
            <TextInput
              placeholder = "Frequency (Optional)"
              keyboardType = {"numeric"}
              style={styles.textInputStyle}
            />
          </View>
          <View style={{padding: 10}}>
            <TextInput
              placeholder = "Location (Optional)"
              style={styles.textInputStyle}
            />
          </View>
        </View>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 5, 
    height: 50, 
    borderColor: 
    'gray', 
    borderWidth: 1
  }
});