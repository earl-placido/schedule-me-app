import React, {Component} from 'react';
import {Content} from 'native-base';
import t from 'tcomb-form-native';
import moment from 'moment';

import PropTypes from 'prop-types';

const Form = t.form.Form;

const timeSlots = {
    fields: {
        startTime: {
          mode: 'time', // display the Date field as a DatePickerAndroid
          config: {
            defaultValueText: 'Tap here to select a time',
            format: date => {
              return moment(date).format('HH:mm');
            },
          },
          error: 'Please input start time duration',
        },
        endTime: {
            mode: 'time', // display the Date field as a DatePickerAndroid
            config: {
              defaultValueText: 'Tap here to select a time',
              format: date => {
                return moment(date).format('HH:mm');
              },
            },
            error: 'Please input meeting duration',
          },
    },
};

const Input = t.struct({
    startTime: t.Date,
    endTime: t.Date,
});

export default class TimePicker extends Component {
    handleTime = () => {
        const value = this.form.getValue();
    
        this.props.handleStartTime(value ? value.startTime : '');
        
    
        if (value) {
            this.props.handleEndTime(value ? value.endTime : '');
        }
      };
    
      render() {
        return (
          <Content padder>
            <Form
              ref={_form => (this.form = _form)}
              options={timeSlots}
              type={Input}
              onChange={this.handleTime}
              value={{
                startTime: this.props.inputStartTime,
                endTime: this.props.inputEndTime,
              }}
            />
          </Content>
        );
      }
    }
    
    TimePicker.propTypes = {
      handleStartTime: PropTypes.func,
      handleEndTime: PropTypes.func,
      inputStartTime: PropTypes.func,
      inputEndTime: PropTypes.any,

    };