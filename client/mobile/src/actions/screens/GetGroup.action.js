import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export const GET_GROUP_INFO_SUCCESS = 'get_group_info_success';
export const GET_GROUP_INFO_FAILURE = 'get_group_info_failure';

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
};

const getGroupSuccess = group => {
  return {
    type: GET_GROUP_INFO_SUCCESS,
    payload: group,
  };
};

export const getGroup = groupId => async dispatch => {
  const token = await AsyncStorage.getItem('token');

  const options = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/`,
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(options);
    dispatch(getGroupSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_GROUP_INFO_SUCCESS:
      return {
        ...state,
        group: action.payload,
      };
    case GET_GROUP_INFO_FAILURE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
