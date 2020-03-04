import React, { Component } from 'react';
import {Content} from 'native-base';
import t from 'tcomb-form-native';
import moment from 'moment';

import PropTypes from 'prop-types';

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
      error: 'Please input meeting duration'
    },
  }
};

const Meeting = t.struct({
  duration: t.Date,
  frequency: t.maybe(t.String),
  location: t.maybe(t.String)
})

export default class GroupMeetingForm extends Component {
  handleGroupMeetingChange = () => {
    const value = this.form.getValue();

    this.props.handleMeetingDuration(value ? value.duration : '');

    if (value) {
      this.props.handleMeetingFrequency(value.frequency);
      this.props.handleMeetingLocation(value.location);
    }
  }
  
  render() {
    return (
      <Content padder>
        <Form 
          ref={_form => this.form = _form}
          options={meetingOptions}
          type={Meeting}
          onChange={this.handleGroupMeetingChange}
          value={{duration: this.props.meetingDuration, frequency: this.props.meetingFrequency, location: this.props.meetingLocation}}
        />
      </Content>
    );
  }
}

GroupMeetingForm.propTypes = {
  handleMeetingDuration: PropTypes.func,
  handleMeetingFrequency: PropTypes.func,
  handleMeetingLocation: PropTypes.func,
  meetingDuration: PropTypes.any,
  meetingFrequency: PropTypes.any,
  meetingLocation: PropTypes.any,
};
