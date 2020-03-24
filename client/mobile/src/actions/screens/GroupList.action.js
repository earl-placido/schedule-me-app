import axios from 'axios';
import Config from 'react-native-config';
import responses from '../util/responses';
import AsyncStorage from '@react-native-community/async-storage';

export const GET_GROUP_LIST_SUCCESS = 'get_group_list_success';
export const GET_GROUP_LIST_FAILURE = 'get_group_list_failure';

const INITIAL_STATE = {
  errored: false,
  groupList: [],
};

const getGroupListSuccess = groupList => {
  return {
    type: GET_GROUP_LIST_SUCCESS,
    payload: {groupList: groupList},
  };
};

const getGroupListFailure = error => {
  return {
    type: GET_GROUP_LIST_FAILURE,
    payload: error,
  };
};

export const getGroupList = () => async dispatch =>{
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

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_GROUP_LIST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_GROUP_LIST_FAILURE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
