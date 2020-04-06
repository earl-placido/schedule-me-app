import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export const ADD_GROUP_MEMBER_SUCCESS = 'add_group_member_success';
export const ADD_GROUP_MEMBER_FAILURE = 'add_group_member_failure';

const INITIAL_STATE = {
  groupMemberId: -1,
  errored: false,
};

const addGroupMemberSuccess = groupMemberId => {
  return {
    type: ADD_GROUP_MEMBER_SUCCESS,
    payload: groupMemberId,
    errored: false,
  };
};

const addGroupMemberFailure = () => {
  return {
    type: ADD_GROUP_MEMBER_SUCCESS,
    payload: INITIAL_STATE.groupMemberId,
    errored: true,
  };
};

export const addGroupMember = groupId => async dispatch => {
  const token = await AsyncStorage.getItem('token');

  const options = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members`,
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(options);
    dispatch(addGroupMemberSuccess(response.data.groupMemberId));
  } catch (err) {
    dispatch(addGroupMemberFailure());
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_GROUP_MEMBER_SUCCESS:
      return {
        ...state,
        groupMemberId: action.payload,
        errored: action.errored,
      };
    case ADD_GROUP_MEMBER_FAILURE:
      return {
        ...state,
        groupMemberId: action.payload,
        errored: action.errored,
      };
    default:
      return state;
  }
};
