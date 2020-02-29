import React, { Component } from 'react';
import {Content} from 'native-base';
import t from 'tcomb-form-native';
import moment from 'moment';

const Form = t.form.Form;

const meetingOptions = {
  fields: {
    duration: {
      mode: 'time', // display the Date field as a DatePickerAndroid
      config: {
        defaultValueText: 'Tap here to select a time',
        format: date => {
          return moment(date).format("HH:mm") ;
        },
      },
    },
  }
};

const Meeting = t.struct({
  duration: t.Date,
  frequency: t.maybe(t.String),
  loation: t.maybe(t.String)
})

export default class GroupMeetingForm extends Component {
  render() {
    return (
      <Content padder>
        <Form options = {meetingOptions} type = {Meeting}/>
      </Content>
    );
  }
}
