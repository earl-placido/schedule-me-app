import axios from "axios";

export const GROUP_LIST = "group_list";
export const CLOSE_ERROR_MODAL= "close_error_modal";

export const getGroupList = () => async dispatch => {
  const authToken = localStorage.getItem("token");
  await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  ).then(response => {
    dispatch({
      type: GROUP_LIST,
      payload: { groupList: response.data.groups, showErrorModal: false }
    });
  }).catch(error => {
    dispatch({
      type: GROUP_LIST,
      payload: { groupList: [], showErrorModal: true }
    });
  })
};

export const closeErrorModal = () => async dispatch => {
  dispatch({
    type: CLOSE_ERROR_MODAL,
    payload: false,
  })
}

const INITIAL_STATE = { groupList: [], showErrorModal: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_LIST: {
      return { ...state, ...action.payload };
    }
    case CLOSE_ERROR_MODAL: {
      return { ...state, showErrorModal: action.payload};
    }
    default: {
      return INITIAL_STATE;
    }
  }
};
