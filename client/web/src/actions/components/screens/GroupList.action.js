import axios from 'axios';

export const GROUP_LIST = 'group_list';

export const getGroupList = () => async(dispatch) => {
    const groupInformation = await axios.get(`http://localhost:8000/api/v1/groups/`);
    dispatch({
        type: GROUP_LIST,
        payload: groupInformation
    });
};

const INITIAL_STATE = {groups: {}};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GROUP_LIST: {
        return {...state, groups: action.payload};
      }
      default: {
        return INITIAL_STATE;
      }
    }
  };