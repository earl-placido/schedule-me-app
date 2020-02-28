import React, { Component } from 'react';
import {View, Text } from 'react-native';
import {Content} from 'native-base';
import t from 'tcomb-form-native';
import moment from 'moment';

const Form = t.form.Form;

function dateTemplate(meeting) {
  // in locals.inputs you find all the rendered fields
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          {meeting.inputs.from}
        </View>
        <View style={{flex: 1}}>
          {meeting.inputs.to}
        </View>
      </View>
    </View>
  );
}

function durationTemplate(meeting) {
  // in locals.inputs you find all the rendered fields
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, paddingRight: 10}}>
          {meeting.inputs.hours}
        </View>
        <View style={{flex: 1}}>
          {meeting.inputs.minutes}
        </View>
      </View>
    </View>
  );
}

const dateOptions = {
  template: dateTemplate,
  fields: {
    from: {
      mode: 'date', // display the Date field as a DatePickerAndroid
      config: {
        dialogMode: 'spinner',
        format: date => {
          return moment(date).format('MM/DD/YYYY');
        },
      },
      minimumDate: moment(new Date()).toDate(),
    },
    to: {
      mode: 'date', // display the Date field as a DatePickerAndroid
      config: {
        dialogMode: 'spinner',
        format: date => {
          return moment(date).format('MM/DD/YYYY');
        }
      },
      minimumDate: moment(new Date()).toDate()
    }
  }
};

const durationOptions = {
  template: durationTemplate
};

const locationOptions = {
  auto: 'none'
}

const MeetingDateRange = t.struct({
  from: t.Date,
  to: t.Date
});

const MeetingDuration = t.struct({
  hours: t.Number,
  minutes: t.Number
});

const MeetingLocation = t.struct({
  loation: t.maybe(t.String)
})

export default class GroupMeetingForm extends Component {
  render() {
    return (
      <Content padder>
        <Text style = {{fontSize: 16, fontWeight: 'bold', paddingBottom: 15}}>
          Range
        </Text>

        <Form options = {dateOptions} type = {MeetingDateRange}/>

        <Text style = {{fontSize: 16, fontWeight: 'bold', paddingBottom: 15}}>
          Duration 
        </Text>
        <Form options = {durationOptions} type = {MeetingDuration}/>

        <Text style = {{fontSize: 16, fontWeight: 'bold', paddingBottom: 15}}>
          Location (Optional)
        </Text>
        <Form options = {locationOptions} type = {MeetingLocation}/>
      </Content>
    );
  }
}
