import axios from 'axios';
import responses from '../../util/responses';
import Config from 'react-native-config';

export const GET_GROUP_INFO_SUCCESS = 'get_group_info_success';
export const GET_GROUP_INFO_FAILURE = 'get_group_info_failure';
export const GET_GROUP_MEMBERS_SUCCESS = 'get_group_members_success';
export const GET_GROUP_MEMBERS_FAILURE = 'get_group_members_failure';

const INITIAL_STATE = {
  message: '',
  errored: false,
  groupInfo: {
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

const getGroupInfoSuccess = groupInfo => {
  return {
    type: GET_GROUP_INFO_SUCCESS,
    payload: groupInfo,
  };
};

const getGroupMembersSuccess = members => {
  return {
    type: GET_GROUP_MEMBERS_SUCCESS,
    payload: members,
  };
};

const getGroupInfoFailure = error => {
  return {
    type: GET_GROUP_INFO_SUCCESS,
    payload: error,
  };
};

const getGroupMembersFailure = error => {
  return {
    type: GET_GROUP_MEMBERS_SUCCESS,
    payload: error,
  };
};

export const getGroupInfo = groupId => {
  return dispatch => {
    const options = {
      url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/`,
      method: 'GET',
    };
    axios(options)
      .then(res => {
        if (res.status === responses.SUCCESS) {
          dispatch(getGroupInfoSuccess(res.data.groups));
        } else {
          throw new Error(res.err);
        }
      })
      .catch(err => {
        dispatch(getGroupInfoFailure(err.message));
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
        groupInfo: action.payload,
      };
    case GET_GROUP_MEMBERS_SUCCESS:
      return {
        ...state,
        groupMembers: action.payload,
      };

    default:
      return state;
  }
};
