import {
  getGroupQuery,
  getGroupMembersQuery,
  getOptimalTimeQuery
} from "../../../actions/components/generalQueries/group.action";

import {
  getMemberIdWithEmail,
} from '../../../actions/components/generalQueries/groupMember.action';

export const GROUP_MEMBERS = "group_members";
export const GROUP_MEMBER = 'group_member';
export const GROUP = "group";
export const SHOW_GROUP_DETAIL_MODAL = "SHOW_GROUP_DETAIL_MODAL";
export const CLOSE_ERROR_MODAL = "close_error_modal";
export const OPTIMAL_TIME = 'optimal_time';


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

export const getGroupMember = groupId => async dispatch => {
  getMemberIdWithEmail(groupId, localStorage.getItem("userEmail")).then(groupMember => {
    dispatch({
      type: GROUP_MEMBER,
      payload: { groupMember }
    });
  }).catch(() => {
    dispatch({
      type: GROUP_MEMBER,
      payload: { groupMember: null, showErrorModal: true }
    });
  });
  
};

export const getOptimalTime = groupId => async dispatch => {
  getOptimalTimeQuery(groupId).then(optimalTimes => {

    dispatch({
      type: OPTIMAL_TIME,
      payload: {optimalTimes}
    });
  });
};

export const showModal = (type) => async dispatch => {
  const value = {
    'availability': {inputModalVisible: true},
    'meeting': {meetingModalVisible: true}
  };

  if (value[type] === undefined) {
    dispatch({
      type: SHOW_GROUP_DETAIL_MODAL,
      payload: {inputModalVisible: false, meetingModalVisible: false}
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
    payload: {inputModalVisible: false, meetingModalVisible: false}
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
  groupMember: null,
  group: {},
  inputModalVisible: false,
  meetingModalVisible: false,
  showErrorModal: false,
  optimalTimes: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_MEMBERS: {
      return { ...state, ...action.payload };
    }
    case GROUP_MEMBER: {
      return {...state, ...action.payload}
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
      return {...state, ...action.payload}
    }
    default: {
      return { ...state };
    }
  }
};
