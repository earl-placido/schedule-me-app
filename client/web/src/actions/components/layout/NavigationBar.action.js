import { getGroupListQuery } from "../generalQueries/Group.action";

export const GROUP_LIST = "group_list";
export const CLOSE_ERROR_MODAL = "close_error_modal";

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

const INITIAL_STATE = { groupList: [], showErrorModal: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_LIST: {
      return { ...state, ...action.payload };
    }
    case CLOSE_ERROR_MODAL: {
      return { ...state, showErrorModal: action.payload };
    }
    default: {
      return state;
    }
  }
};
