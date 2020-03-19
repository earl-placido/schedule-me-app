import axios from "axios";
import { getGroupQuery } from "../../../actions/components/generalQueries/group.action";

export const GROUP_MEMBERS = "group_members";
export const GROUP = "group";
export const SHOW_INPUT_MODAL = "show_input_modal";

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

export const showModal = () => async dispatch => {
  dispatch({
    type: SHOW_INPUT_MODAL,
    payload: true
  });
};

export const closeModal = () => async dispatch => {
  dispatch({
    type: SHOW_INPUT_MODAL,
    payload: false
  });
};

const INITIAL_STATE = { groupMembers: [], group: {}, inputModalVisible: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_MEMBERS: {
      return { ...state, groupMembers: action.payload };
    }
    case GROUP: {
      return { ...state, group: action.payload };
    }
    case SHOW_INPUT_MODAL: {
      return { ...state, inputModalVisible: action.payload };
    }
    default: {
      return state;
    }
  }
};
