import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export const UPDATE_GROUP_NAME = 'update_group_name';
export const UPDATE_GROUP_DESCRIPTION = 'update_group_description';
export const UPDATE_MEETING_DURATION = 'update_meeting_duration';
export const UPDATE_MEETING_FREQUENCY = 'update_meeting_frequency';
export const UPDATE_MEETING_LOCATION = 'update_meeting_location';
export const SUBMIT_MEETING_CREATION = 'submit_meeting_creation';

export const updateGroupName = groupName => {
  return {
    type: UPDATE_GROUP_NAME,
    payload: groupName,
  };
};

export const updateGroupDescription = groupDescription => {
  return {
    type: UPDATE_GROUP_DESCRIPTION,
    payload: groupDescription,
  };
};

export const updateMeetingDuration = meetingDuration => {
  return {
    type: UPDATE_MEETING_DURATION,
    payload: meetingDuration,
  };
};

export const updateMeetingFrequency = meetingFrequency => {
  return {
    type: UPDATE_MEETING_FREQUENCY,
    payload: meetingFrequency,
  };
};

export const updateMeetingLocation = meetingLocation => {
  return {
    type: UPDATE_MEETING_LOCATION,
    payload: meetingLocation,
  };
};

export const submitMeetingCreation = (
  groupName,
  groupDesc,
  duration,
  meetingFrequency,
  meetingLocation,
) => async dispatch => {
  //TO DO: Add success field
  if (duration === null)
    return {type: SUBMIT_MEETING_CREATION, payload: {success: false}};

  const dateDuration = duration; // to format to 2 decimals
  const hours = ('0' + dateDuration.getHours()).slice(-2);
  const minutes = ('0' + dateDuration.getMinutes()).slice(-2);
  const seconds = ('0' + dateDuration.getSeconds()).slice(-2);

  const meetingDuration = hours + minutes + seconds;
  const groupCreation = {
    groupName,
    groupDesc,
    meetingDuration,
    meetingFrequency,
    meetingLocation,
  };
  const token = await AsyncStorage.getItem('token');

  const options = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups`,
    method: 'POST',
    data: groupCreation,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  // call backend to add group
  try {
    const response = await axios(options);
    const code = response.data.groupId.toString();
    dispatch({type: SUBMIT_MEETING_CREATION, payload: {code}});
  } catch (err) {
    console.log(err);
  }
};

const INITIAL_STATE = {
  groupName: '',
  groupDescription: '',
  meetingDuration: '',
  meetingFrequency: '',
  meetingLocation: '',
  meetingCode: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_GROUP_NAME: {
      return {...state, groupName: action.payload};
    }
    case UPDATE_GROUP_DESCRIPTION: {
      return {...state, groupDescription: action.payload};
    }
    case UPDATE_MEETING_DURATION: {
      return {...state, meetingDuration: action.payload};
    }
    case UPDATE_MEETING_FREQUENCY: {
      return {...state, meetingFrequency: action.payload};
    }
    case UPDATE_MEETING_LOCATION: {
      return {...state, meetingLocation: action.payload};
    }
    case SUBMIT_MEETING_CREATION: {
      return {...state, meetingCode: action.payload.code};
    }
    default: {
      return INITIAL_STATE;
    }
  }
};
