import React, { Component } from 'react';
import {TextInput, View } from 'react-native';
import {Content} from 'native-base';

export default class GroupInfoForm extends Component {
  render() {
    return (
      <Content padder>
        <View>
          <View style={{padding: 10}}>
            <TextInput
              placeholder = "Enter Group Name"
              style={{ borderRadius: 5, height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
          </View>
          <View style={{padding: 10}}>
            <TextInput
            placeholder = "Enter Group Description (Optional)"
            textAlignVertical={'top'}
            style={{ borderRadius: 5, height: 100, borderColor: 'gray', borderWidth: 1 }}
            multiline = {true}
            numberOfLines = {4}/>
          </View>
        </View>
      </Content>
    );
  }
}