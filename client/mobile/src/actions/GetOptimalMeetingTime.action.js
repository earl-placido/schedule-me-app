import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import {getGroupMemberWithEmail} from './screens/GetGroupMembers.action';
import {
  setCurrentOptimalTimeQuery,
  formatDateToString,
  getMeetingIdsQuery,
  getMeetingCurrentOptimalTimeQuery,
  getOptimalTimes,
} from './OptimalMeetingTime.action';

export const GET_OPTIMAL_TIMES = 'get_optimal_time';
export const SELECT_MEETING = 'select_meeting';
export const GET_ALL_OPTIMAL_TIMES = 'get_all_optimal_times';
export const TOGGLE_MEETING_MODAL = 'toggle_meeting_modal';
export const SET_OPTIMAL_TIME = 'set_optimal_time';
export const SELECT_OPTIMAL_TIME = 'select_optimal_time';
export const GET_GROUP_MEMBER = 'get_group_member';

const INITIAL_STATE = {
  meetings: [],
  optimalTimes: null,
  selectedMeeting: null,
  isMeetingModalVisible: false,
  selfMember: null,
  selectedSameOptimalTime: false,
};

export const getGroupOptimalTime = groupId => async dispatch => {
  const meetings = await getMeetingIdsQuery(groupId);
  const meetingIds = meetings.map(meeting => meeting.MeetingId);

  const meetingsOptimalTimes = await getMeetingCurrentOptimalTimeQuery(
    meetingIds,
  );

  meetingsOptimalTimes.map((optimalTime, index) => {
    const startTime = moment(optimalTime['CAST(StartTime as char)']);
    const endTime = moment(optimalTime['CAST(EndTime as char)']);
    const lastUpdatedTime = moment(optimalTime['LastUpdated']);
    const meetingTimeString = formatDateToString(
      startTime,
      endTime,
      lastUpdatedTime,
    );
    meetings[index].meetingTimeString = meetingTimeString;
  });

  dispatch({
    type: GET_OPTIMAL_TIMES,
    payload: {meetings: meetings},
  });
};

export const selectMeeting = selectedMeeting => dispatch => {
  dispatch({
    type: SELECT_MEETING,
    payload: {selectedMeeting},
  });
};

export const selectOptimalTime = selectedOptimalTime => dispatch => {
  dispatch({
    type: SELECT_OPTIMAL_TIME,
    payload: {selectedOptimalTime},
  });
};

export const getAllOptimalTimes = groupId => async dispatch => {
  const allOptimalTimes = await getOptimalTimes(groupId);
  dispatch({
    type: SELECT_MEETING,
    payload: {optimalTimes: allOptimalTimes},
  });
};

export const toggleMeetingModal = isMeetingModalVisible => {
  return {
    type: TOGGLE_MEETING_MODAL,
    payload: {isMeetingModalVisible: !isMeetingModalVisible},
  };
};

export const setOptimalTime = (
  meetings,
  selectedMeeting,
  optimalTime,
) => async dispatch => {
  console.log(optimalTime);
  if (!optimalTime) {
    dispatch({
      type: SET_OPTIMAL_TIME,
      payload: {isMeetingModalVisible: false},
    });
    return;
  }

  const optimalTimeInfo = optimalTime[0].split(':');
  const date = optimalTimeInfo[0];

  const startEndInfo = optimalTimeInfo[1].split('_');
  let startTime =
    '0' +
    parseFloat(startEndInfo[0])
      .toFixed(2)
      .toString();
  let endTime =
    '0' +
    parseFloat(startEndInfo[1])
      .toFixed(2)
      .toString();
  startTime =
    date +
    ' ' +
    startTime.substr(startTime.length - 5).replace('.', ':') +
    ':00';
  endTime =
    date + ' ' + endTime.substr(endTime.length - 5).replace('.', ':') + ':00';

  const response = await setCurrentOptimalTimeQuery(
    selectedMeeting.MeetingId,
    startTime,
    endTime,
  );

  console.log(response);
  // if user picks the same time, don't change updated time
  if (!response['changedTime']) {
    dispatch({
      type: SET_OPTIMAL_TIME,
      payload: {
        selectedSameOptimalTime: true,
        meetingModalVisible: false,
      },
    });
    return;
  }

  for (let i = 0; i < meetings.length; i++) {
    if (meetings[i].MeetingId === selectedMeeting.MeetingId) {
      const meetingTimeString = formatDateToString(
        moment(startTime),
        moment(endTime),
        moment(new Date()),
      );
      meetings[i].meetingTimeString = meetingTimeString;
    }
  }

  dispatch({
    type: SET_OPTIMAL_TIME,
    payload: {
      selectedSameOptimalTime: false,
      meetings: meetings,
      meetingModalVisible: false,
    },
  });
};

export const getSelfMember = groupId => async dispatch => {
  const userEmail = await AsyncStorage.getItem('userEmail');
  const groupMember = await getGroupMemberWithEmail(groupId, userEmail);
  try {
    dispatch({
      type: GET_GROUP_MEMBER,
      payload: {
        selfMember: groupMember,
      },
    });
  } catch (err) {
    dispatch({
      type: GET_GROUP_MEMBER,
      payload: {
        selfMember: null,
      },
    });
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_OPTIMAL_TIMES: {
      return {...state, ...action.payload};
    }
    case SELECT_MEETING: {
      return {...state, ...action.payload};
    }
    case SELECT_OPTIMAL_TIME: {
      return {...state, ...action.payload};
    }
    case GET_ALL_OPTIMAL_TIMES: {
      return {...state, ...action.payload};
    }
    case TOGGLE_MEETING_MODAL: {
      return {...state, ...action.payload};
    }
    case SET_OPTIMAL_TIME: {
      return {...state, ...action.payload};
    }
    case GET_GROUP_MEMBER: {
      return {...state, ...action.payload};
    }
    default: {
      return {...state};
    }
  }
};
