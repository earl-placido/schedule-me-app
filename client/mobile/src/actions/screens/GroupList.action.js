import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export const GET_GROUP_LIST_SUCCESS = 'get_group_list_success';
export const GET_GROUP_LIST_FAILURE = 'get_group_list_failure';
export const RESET_GROUP_LIST = 'reset_group_list';

const INITIAL_STATE = {
  errored: false,
  groupList: [],
};

const getGroupListSuccess = groupList => {
  return {
    type: GET_GROUP_LIST_SUCCESS,
    payload: groupList,
  };
};

export const getGroupList = () => async dispatch => {
  const token = await AsyncStorage.getItem('token');

  const options = {
    url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`,
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(options);
    dispatch(getGroupListSuccess(response.data.groups));
  } catch (err) {
    console.log(err);
  }
};

export const resetGroupList = () => {
  return {
    type: GET_GROUP_LIST_SUCCESS,
    payload: {
      errored: false,
      groupList: [],
    },
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_GROUP_LIST_SUCCESS:
      return {
        ...state,
        groupList: action.payload,
      };
    case GET_GROUP_LIST_FAILURE:
      return {
        ...state,
        message: action.payload,
      };
    case RESET_GROUP_LIST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
