import axios from "axios";

export const GROUP_MEMBERS = "group_members";

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

const INITIAL_STATE = { groupMembers: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_MEMBERS: {
      return { ...state, groupMembers: action.payload };
    }
    default: {
      return INITIAL_STATE;
    }
  }
};
