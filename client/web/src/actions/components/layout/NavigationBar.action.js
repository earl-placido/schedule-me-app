import { getGroupListQuery } from "../../Group.action";

export const GROUP_LIST = "group_list";
export const CLOSE_ERROR_MODAL = "close_error_modal";
export const CLOSE_JOIN_GROUP_MODAL = "close_join_group_modal";
export const SHOW_JOIN_GROUP_MODAL = "show_join_group_modal";

export const getGroupList = () => async dispatch => {
  await getGroupListQuery()
    .then(response => {
      dispatch({
        type: GROUP_LIST,
        payload: { groupList: response.data.groups }
      });
    })
    .catch(() => {
      dispatch({
        type: GROUP_LIST,
        payload: { groupList: [], showErrorModal: true }
      });
    });
};

export const closeErrorModal = () => async dispatch => {
  dispatch({
    type: CLOSE_ERROR_MODAL,
    payload: false
  });
};

export const showJoinGroupModal = () => async dispatch => {
  dispatch({
    type: SHOW_JOIN_GROUP_MODAL,
    payload: true
  });
};

export const closeJoinGroupModal = () => async dispatch => {
  dispatch({
    type: CLOSE_JOIN_GROUP_MODAL,
    payload: false
  });
};

const INITIAL_STATE = {
  groupList: [],
  showErrorModal: false,
  showGroupCodeModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_LIST: {
      return { ...state, ...action.payload };
    }
    case CLOSE_ERROR_MODAL: {
      return { ...state, showErrorModal: action.payload };
    }
    case SHOW_JOIN_GROUP_MODAL: {
      return { ...state, showGroupCodeModal: action.payload };
    }
    case CLOSE_JOIN_GROUP_MODAL: {
      return { ...state, showGroupCodeModal: action.payload };
    }
    default: {
      return state;
    }
  }
};
