import moment from "moment";

import {
  getGroupQuery,
  getGroupMembersQuery,
  getOptimalTimeQuery,
  getMeetingIdsQuery,
  setCurrentOptimalTimeQuery,
  getMeetingCurrentOptimalTimeQuery
} from "../Group.action";

import { getMemberIdWithEmail } from "../GroupMember.action";

export const GROUP_MEMBERS = "group_members";
export const GROUP_MEMBER = "group_member";
export const GROUP = "group";
export const SHOW_GROUP_DETAIL_MODAL = "SHOW_GROUP_DETAIL_MODAL";
export const CLOSE_ERROR_MODAL = "close_error_modal";
export const OPTIMAL_TIME = "optimal_time";
export const MEETING_IDS = "meeting_ids";
export const SELECT_MEETING_ID = "select_meeting_id";
export const SELECT_OPTIMAL_TIME = "select_optimal_time";
export const SET_OPTIMAL_TIME = "set_optimal_time";

const formatDateToString = (startTime, endTime) => {
  //starttime and endtime is in moment format
  const day = startTime.format("YYYY-MM-DD(dddd)");
  const startTimeString = startTime.format("HH:mm");
  const endTimeString = endTime.format("HH:mm");
  const meetingAvailableString = `${day} ${startTimeString} - ${endTimeString}`;
  return meetingAvailableString;
};

// get group members information
export const getGroupMembers = groupId => async dispatch => {
  await getGroupMembersQuery(groupId)
    .then(response => {
      dispatch({
        type: GROUP_MEMBERS,
        payload: { groupMembers: response.data.groupMembers }
      });
    })
    .catch(() => {
      dispatch({
        type: GROUP_MEMBERS,
        payload: { groupMembers: [], showErrorModal: true }
      });
    });
};

export const getGroup = groupId => async dispatch => {
  await getGroupQuery(groupId)
    .then(response => {
      dispatch({
        type: GROUP,
        payload: { group: response.data }
      });
    })
    .catch(() => {
      dispatch({
        type: GROUP,
        payload: { group: [], showErrorModal: true }
      });
    });
};

export const getSelfMember = groupId => async dispatch => {
  getMemberIdWithEmail(groupId, localStorage.getItem("userEmail"))
    .then(selfMember => {
      dispatch({
        type: GROUP_MEMBER,
        payload: { selfMember }
      });
    })
    .catch(() => {
      dispatch({
        type: GROUP_MEMBER,
        payload: { selfMember: null, showErrorModal: true }
      });
    });
};

export const getOptimalTime = groupId => async dispatch => {
  getOptimalTimeQuery(groupId).then(optimalTimes => {
    const todayDate = moment();
    // remove dates that are past today
    let filteredOptimalTimes = [];
    for (let optimalTime of optimalTimes) {
      const currentDate = moment(optimalTime[0].split(":")[0]);
      if (currentDate.isAfter(todayDate))
        filteredOptimalTimes.push(optimalTime);
    }

    dispatch({
      type: OPTIMAL_TIME,
      payload: { optimalTimes: filteredOptimalTimes }
    });
  });
};

export const setOptimalTime = (
  meetings,
  selectedMeeting,
  optimalTime
) => async dispatch => {
  if (!optimalTime) {
    dispatch({
      type: SET_OPTIMAL_TIME,
      payload: { meetingModalVisible: false }
    });
    return;
  }

  const optimalTimeInfo = optimalTime[0].split(":");
  const date = optimalTimeInfo[0];

  const startEndInfo = optimalTimeInfo[1].split("_");
  let startTime =
    "0" +
    parseFloat(startEndInfo[0])
      .toFixed(2)
      .toString();
  let endTime =
    "0" +
    parseFloat(startEndInfo[1])
      .toFixed(2)
      .toString();
  startTime =
    date +
    " " +
    startTime.substr(startTime.length - 5).replace(".", ":") +
    ":00";
  endTime =
    date + " " + endTime.substr(endTime.length - 5).replace(".", ":") + ":00";

  setCurrentOptimalTimeQuery(
    selectedMeeting.MeetingId,
    startTime,
    endTime
  ).then(result => {
    for (let i = 0; i < meetings.length; i++) {
      if (meetings[i].MeetingId === selectedMeeting.MeetingId) {
        const meetingAvailableString = formatDateToString(
          moment(startTime),
          moment(endTime)
        );
        meetings[i].meetingAvailableString = meetingAvailableString;
      }
    }

    dispatch({
      type: SET_OPTIMAL_TIME,
      payload: {
        success: result.success,
        error: !result.success,
        meetingModalVisible: false
      }
    });
  });
};

export const getMeetings = groupId => async dispatch => {
  getMeetingIdsQuery(groupId).then(meetings => {
    const meetingIds = meetings.map(meeting => meeting.MeetingId);

    getMeetingCurrentOptimalTimeQuery(meetingIds).then(
      optimalAvailabilities => {
        optimalAvailabilities.map((optimalAvailability, index) => {
          const startTime = moment(
            optimalAvailability["CAST(StartTime as char)"]
          );
          const endTime = moment(optimalAvailability["CAST(EndTime as char)"]);

          const meetingAvailableString = formatDateToString(startTime, endTime);
          meetings[index].meetingAvailableString = meetingAvailableString;
          return null;
        });

        dispatch({
          type: MEETING_IDS,
          payload: { meetings }
        });
      }
    );
  });
};

export const selectMeeting = selectedMeeting => dispatch => {
  dispatch({
    type: SELECT_MEETING_ID,
    payload: { selectedMeeting }
  });
};

export const selectOptimalTime = selectedOptimalTime => dispatch => {
  dispatch({
    type: SELECT_OPTIMAL_TIME,
    payload: { selectedOptimalTime }
  });
};

export const showModal = type => async dispatch => {
  const value = {
    availability: { inputModalVisible: true },
    meeting: { meetingModalVisible: true }
  };

  if (value[type] === undefined) {
    dispatch({
      type: SHOW_GROUP_DETAIL_MODAL,
      payload: { inputModalVisible: false, meetingModalVisible: false }
    });
    return;
  }

  dispatch({
    type: SHOW_GROUP_DETAIL_MODAL,
    payload: value[type]
  });
};

export const closeModal = () => async dispatch => {
  dispatch({
    type: SHOW_GROUP_DETAIL_MODAL,
    payload: { inputModalVisible: false, meetingModalVisible: false }
  });
};

export const closeErrorModal = () => async dispatch => {
  dispatch({
    type: CLOSE_ERROR_MODAL,
    payload: false
  });
};

const INITIAL_STATE = {
  groupMembers: [],
  selfMember: null,
  group: {},
  inputModalVisible: false,
  meetingModalVisible: false,
  showErrorModal: false,
  optimalTimes: null,
  meetings: [],
  selectedMeeting: null,
  selectedOptimalTime: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_MEMBERS: {
      return { ...state, ...action.payload };
    }
    case GROUP_MEMBER: {
      return { ...state, ...action.payload };
    }
    case GROUP: {
      return { ...state, ...action.payload };
    }
    case SHOW_GROUP_DETAIL_MODAL: {
      return { ...state, ...action.payload };
    }
    case CLOSE_ERROR_MODAL: {
      return { ...state, showErrorModal: action.payload };
    }
    case OPTIMAL_TIME: {
      return { ...state, ...action.payload };
    }
    case MEETING_IDS: {
      return { ...state, ...action.payload };
    }
    case SELECT_MEETING_ID: {
      return { ...state, ...action.payload };
    }
    case SELECT_OPTIMAL_TIME: {
      return { ...state, ...action.payload };
    }
    case SET_OPTIMAL_TIME: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
