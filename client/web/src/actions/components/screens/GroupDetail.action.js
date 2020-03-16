import axios from "axios";
import { getGroupQuery } from "../../../actions/components/generalQueries/group.action";

export const GROUP_MEMBERS = "group_members";
export const GROUP = "group";

export const getGroupMembers = groupId => async dispatch => {
  const authToken = localStorage.getItem("token");
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  dispatch({
    type: GROUP_MEMBERS,
    payload: response.data.groupMembers
  });
};

export const getGroup = groupId => async dispatch => {
  const response = await getGroupQuery(groupId);
  dispatch({
    type: GROUP,
    payload: response.data
  });
};

const INITIAL_STATE = { groupMembers: [], group: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_MEMBERS: {
      return { ...state, groupMembers: action.payload };
    }
    case GROUP: {
      return { ...state, group: action.payload };
    }
    default: {
      return INITIAL_STATE;
    }
  }
};
