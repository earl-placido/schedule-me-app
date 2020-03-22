import React, {Component} from 'react';
import { FlatList, View} from 'react-native';
import {Button, Text} from 'native-base';
import {Calendar} from 'react-native-calendars';
import TimePicker from '../TimePicker';
import PropTypes from 'prop-types';

import {
  updateInputStartTime,
  updateInputEndTime,
  submitTimePicker
} from '../../actions/components/screens/TimePicker.action';
import {connect} from 'react-redux';
class InputAvailability extends Component {
  
  createTimePicker = () => {
    this.props.submitTimePicker(
      this.inputStartTime,
      this.updateInputEndTime,
    )
  }

    render() {
        return (
          
            <View>
                <Button googleButtonStyle>
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

                  <TimePicker
                    handleStartTime={this.props.updateInputStartTime}
                    handleEndTime={this.props.updateInputEndTime}
                    inputStartTime={this.props.inputStartTime}
                    inputEndTime={this.props.inputEndTime}
                  ></TimePicker>
                 
                  <FlatList  
                    data = {[
                      {key: '12:00am'},
                      {key: '1:00am'},
                      {key: '2:00am'},
                      {key: '3:00am'},
                      {key: '4:00am'},
                      {key: '5:00am'},
                      {key: '6:00am'},
                      {key: '7:00am'},
                      {key: '8:00am'},
                      {key: '9:00am'},
                      {key: '10:00am'},
                      {key: '11:00am'},
                      {key: '12:00pm'},
                    ]}
                    renderItem={({item}) => <Button border><Text >{item.key}</Text></Button>
                     }
                    
                  />

                
                
                
            </View>
            
        
        );
    }
}

// const styles = StyleSheet.create({
//   modalStyle: {
//     padding: 20,
//   },
//   buttonStyle: {
//     justifyContent: 'center',
//     marginVertical: 25,
//     marginHorizontal: 50,
//   },
//   googleButtonStyle: {
//     alignItems: 'center',
//     marginBottom: 10,
//     fontSize: 50,
//   },
//   itemList: {
//     fontSize: 30,
//     borderWidth: 1,
//     borderColor: 'blue',
//     //color: 'blue',
//     borderRadius: 1,
//     borderStyle: 'solid',
//     //padding: '1px',

//   },
//   title:{
//     fontSize: 50,
//   }
// });

const mapStateToProps = ({InputAvailabilityReducer}) => {
  const {
    inputStartTime,
    inputEndTime,
  } = InputAvailabilityReducer;
  return {
    inputStartTime,
    inputEndTime,
  };
};

InputAvailability.propTypes = {
  inputStartTime: PropTypes.any,
  inputEndTime: PropTypes.any,
  updateInputStartTime: PropTypes.func,
  updateInputEndTime: PropTypes.func,
  submitTimePicker: PropTypes.func,
};

export default connect(mapStateToProps, {
  updateInputStartTime,
  updateInputEndTime,
  submitTimePicker,
})(InputAvailability);