import { getGroupQuery, getGroupMembersQuery } from "../../../actions/components/generalQueries/group.action";

export const GROUP_MEMBERS = "group_members";
export const GROUP = "group";
export const SHOW_INPUT_MODAL = "show_input_modal";
export const CLOSE_ERROR_MODAL= "close_error_modal";

export const getGroupMembers = groupId => async dispatch => {
  await getGroupMembersQuery(groupId)
  .then(response => {
    dispatch({
      type: GROUP_MEMBERS,
      payload: {groupMembers: response.data.groupMembers, showErrorModal: false}
    });
  })
  .catch(error => {
      dispatch({
        type: GROUP_MEMBERS,
        payload: {groupMembers: [], showErrorModal: true}
    });
  });
};

export const getGroup = groupId => async dispatch => {
  await getGroupQuery(groupId).then(response => {
    dispatch({
      type: GROUP,
      payload: {group: response.data, showErrorModal: false}
    });
  }).catch(error=> {
    dispatch({
      type: GROUP,
      payload: {group: [], showErrorModal: true}
    });
  })
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

export const closeErrorModal = () => async dispatch => {
  dispatch({
    type: CLOSE_ERROR_MODAL,
    payload: false,
  })
}

const INITIAL_STATE = { groupMembers: [], group: {}, inputModalVisible: false, showErrorModal: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_MEMBERS: {
      return { ...state, ...action.payload };
    }
    case GROUP: {
      return { ...state, ...action.payload };
    }
    case SHOW_INPUT_MODAL: {
      return { ...state, inputModalVisible: action.payload };
    }
    case CLOSE_ERROR_MODAL: {
      return { ...state, showErrorModal: action.payload};
    }
    default: {
      return {...state};
    }
  }
};
