import axios from 'axios';

export const GROUP_LIST = 'group_list';

export const getGroupList = () => async(dispatch) => {
    const groupInformation = await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`);
    dispatch({
        type: GROUP_LIST,
        payload: groupInformation
    });
};

const INITIAL_STATE = {groupList: {}};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GROUP_LIST: {
        return {...state, groupList: action.payload};
      }
      default: {
        return INITIAL_STATE;
      }
    }
  };