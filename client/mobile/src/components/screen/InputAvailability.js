import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Button, Text} from 'native-base';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
//import { addLocale } from 'react-native-week-view';


import PropTypes from 'prop-types';

export default class InputAvailability extends Component {
    render() {
        return (
            <View>
                <Button oogleButtonStyle>
                    <Text>Input Availability</Text>
                </Button>
                 <Calendar
                    onPressArrowLeft={substractMonth => substractMonth()}
                    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {console.log('selected day', day)}}
                    >
                </Calendar> 
                
                
            </View>
            
        
        );
    }
}

const styles = StyleSheet.create({
  modalStyle: {
    padding: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginVertical: 25,
    marginHorizontal: 50,
  },
  googleButtonStyle: {
    alignItems: 'center',
    marginBottom: 10,
  },
});