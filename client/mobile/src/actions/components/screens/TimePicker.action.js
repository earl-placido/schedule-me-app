import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export const UPDATE_INPUT_START_TIME = 'update_input_start_time';
export const UPDATE_INPUT_END_TIME = 'update_input_end_time';
export const SUBMIT_TIME_PICKER = 'submit_meeting_creation';

export const updateInputStartTime = inputStartTime => {
    return {
      type: UPDATE_INPUT_START_TIME,
      payload: inputStartTime,
    };
};

export const updateInputEndTime = inputEndTime => {
    return {
      type: UPDATE_INPUT_END_TIME,
      payload: inputEndTime,
    };
};

export const submitTimePicker = (
  startTime,
  endTime,
) => async dispatch => {
  //TO DO: Add success field
  if (startTime === null)
    return {type: SUBMIT_TIME_PICKER, payload: {success: false}};

  const dateDurationStart = startTime; // to format to 2 decimals
  const hours = ('0' + dateDurationStart.getHours()).slice(-2);
  const minutes = ('0' + dateDurationStart.getMinutes()).slice(-2);
  const seconds = ('0' + dateDurationStart.getSeconds()).slice(-2);

  const dateDurationEnd = endTime; // to format to 2 decimals
  const hours2 = ('0' + dateDurationStart.getHours()).slice(-2);
  const minutes2 = ('0' + dateDurationEnd.getMinutes()).slice(-2);
  const seconds2 = ('0' + dateDurationEnd.getSeconds()).slice(-2);

  const inputStartTime = hours + minutes + seconds;
  const inputEndTime = hours2 + minutes2 + seconds2;
  const InputAvailabilityCreation = {
    inputStartTime,
    inputEndTime,
  };

};

const INITIAL_STATE = {
    inputStartTime: '',
    inputEndTime: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case UPDATE_INPUT_START_TIME: {
        return {...state, inputStartTime: action.payload};
      }
      case UPDATE_INPUT_END_TIME: {
        return {...state, inputEndTime: action.payload};
      }
      default: {
        return INITIAL_STATE;
      }
    }
  };