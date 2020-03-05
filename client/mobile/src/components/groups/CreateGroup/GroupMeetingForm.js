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
      error: 'Please input group duration'
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

    this.props.handleGroupDuration(value ? value.duration : '');

    if (value) {
      this.props.handleGroupFrequency(value.frequency);
      this.props.handleGroupLocation(value.location);
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
          value={{duration: this.props.groupDuration, frequency: this.props.groupFrequency, location: this.props.groupLocation}}
        />
      </Content>
    );
  }
}

GroupMeetingForm.propTypes = {
  handleGroupDuration: PropTypes.func,
  handleGroupFrequency: PropTypes.func,
  handleGroupLocation: PropTypes.func,
  groupDuration: PropTypes.any,
  groupFrequency: PropTypes.any,
  groupLocation: PropTypes.any,
};
