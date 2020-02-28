import React, { Component } from 'react';
import {Content} from 'native-base';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const groupOptions = {
  fields: {
    description: {
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 150,
            textAlignVertical: 'top',
          },
        }
      }
    },
  }
}

const Group = t.struct({
  name: t.String,
  description: t.maybe(t.String)
});

export default class GroupInfoForm extends Component {
  render() {
    return (
      <Content padder>
        <Form options={groupOptions} type = {Group}/>
      </Content>
    );
  }
}