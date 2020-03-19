import { getGroupListQuery } from "../generalQueries/group.action";

export const GROUP_LIST = "group_list";

export const getGroupList = () => async dispatch => {
  const response = await getGroupListQuery();
  dispatch({
    type: GROUP_LIST,
    payload: response.data.groups
  });
};

const INITIAL_STATE = { groupList: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_LIST: {
      return { ...state, groupList: action.payload };
    }
    default: {
      return state;
    }
  }
};
