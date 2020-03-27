import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export const GET_GROUP_MEMBERS_SUCCESS = 'get_group_members_success';
export const GET_GROUP_MEMBERS_FAILURE = 'get_group_members_failure';

const INITIAL_STATE = {
  errored: false,
  groupMembers: [],
};

const getGroupMembersSuccess = members => {
  return {
    type: GET_GROUP_MEMBERS_SUCCESS,
    payload: members,
  };
};

export const getGroupMembers = groupId => async dispatch => {
  const token = await AsyncStorage.getItem('token');

  const options = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/`,
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(options);
    dispatch(getGroupMembersSuccess(response.data.groupMembers));
  } catch (err) {
    console.log(err);
  }
};

export const getGroupMemberIdWithEmail = async (groupId, userEmail) => {
  const token = await AsyncStorage.getItem('token');

  const userOptions = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/${userEmail}`,
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const userResponse = await axios(userOptions);
    const userId = userResponse.data.userId;
    const groupMemberId = await getGroupMemberIdWithUserId(groupId, userId);
    return groupMemberId;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const getGroupMemberIdWithUserId = async (groupId, userId) => {
  const token = await AsyncStorage.getItem('token');

  const groupMemberOptions = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`,
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const groupMemberResponse = await axios(groupMemberOptions);

    if (groupMemberResponse.data.groupMembers[0] !== undefined) {
      const groupMemberId =
      groupMemberResponse.data.groupMembers[0].GroupMemberId;
      return groupMemberId;
    }
    
  } catch (err) {
    console.log(err);
    return;
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_GROUP_MEMBERS_SUCCESS:
      return {
        ...state,
        groupMembers: action.payload,
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
