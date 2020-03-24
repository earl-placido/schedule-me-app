import axios from 'axios';
import Config from 'react-native-config';
import responses from '../util/responses';

export const GET_GROUP_INFO_SUCCESS = 'get_group_info_success';
export const GET_GROUP_INFO_FAILURE = 'get_group_info_failure';
export const GET_GROUP_MEMBERS_SUCCESS = 'get_group_members_success';
export const GET_GROUP_MEMBERS_FAILURE = 'get_group_members_failure';

const INITIAL_STATE = {
  errored: false,
  group: {
    group: {
      id: -1,
      name: '',
      description: '',
      ownerId: -1,
      lastUpdated: -1,
    },
    meeting: {
      id: -1,
      duration: '',
      frequency: '',
      location: '',
    },
  },
  groupMembers: [],
};

const getGroupSuccess = group => {
  return {
    type: GET_GROUP_INFO_SUCCESS,
    payload: group,
  };
};

const getGroupFailure = error => {
  return {
    type: GET_GROUP_INFO_SUCCESS,
    payload: error,
  };
};

const getGroupMembersSuccess = members => {
  return {
    type: GET_GROUP_MEMBERS_SUCCESS,
    payload: members,
  };
};

const getGroupMembersFailure = error => {
  return {
    type: GET_GROUP_MEMBERS_SUCCESS,
    payload: error,
  };
};

export const getGroup = groupId => {
  return dispatch => {
    const options = {
      url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/`,
      method: 'GET',
    };
    axios(options)
      .then(res => {
        if (res.status === responses.SUCCESS) {
          dispatch(getGroupSuccess(res.data.groups));
        } else {
          throw new Error(res.err);
        }
      })
      .catch(err => {
        dispatch(getGroupFailure(err.message));
      });
  };
};

export const getGroupMembers = groupId => {
  return dispatch => {
    const options = {
      url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/`,
      method: 'GET',
    };
    axios(options)
      .then(res => {
        if (res.status === responses.SUCCESS) {
          dispatch(getGroupMembersSuccess(res.data.members));
        } else {
          throw new Error(res.err);
        }
      })
      .catch(err => {
        dispatch(getGroupMembersFailure(err.message));
      });
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_GROUP_INFO_SUCCESS:
      return {
        ...state,
        group: action.payload,
      };
    case GET_GROUP_MEMBERS_SUCCESS:
      return {
        ...state,
        groupMembers: action.payload,
      };
    case GET_GROUP_INFO_FAILURE:
      return {
        ...state,
        message: action.payload,
      };
    case GET_GROUP_MEMBERS_FAILURE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
