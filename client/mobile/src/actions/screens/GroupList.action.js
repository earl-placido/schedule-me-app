import axios from 'axios';
import Config from 'react-native-config';
import responses from '../util/responses';

export const GET_GROUP_LIST_SUCCESS = 'get_group_list_success';
export const GET_GROUP_LIST_FAILURE = 'get_group_list_failure';

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

const getGroupListFailure = error => {
  return {
    type: GET_GROUP_LIST_FAILURE,
    payload: error,
  };
};

export const getGroupList = () => {
  return dispatch => {
    const options = {
      url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`,
      method: 'GET',
    };
    axios(options)
      .then(res => {
        if (res.status === responses.SUCCESS) {
          dispatch(getGroupListSuccess(res.data.members));
        } else {
          throw new Error(res.err);
        }
      })
      .catch(err => {
        dispatch(getGroupListFailure(err.message));
      });
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_GROUP_LIST_SUCCESS:
      return {
        ...state,
        groups: action.payload,
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
