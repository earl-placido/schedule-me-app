import { addUserToGroupQuery } from "../Group.action";

export const ADD_USER = "add_user";
export const SET_CODE = "set_code";

export const setCode = value => async dispatch => {
  dispatch({
    type: ADD_USER,
    payload: { code: value }
  });
};

export const addUserToGroup = groupId => async dispatch => {
  await addUserToGroupQuery(groupId)
    .then(response => {
      if (response.data.groupMemberId > 0) {
        const link = `${window.location.origin}/groups/${groupId}/`;
        dispatch({
          type: ADD_USER,
          payload: { groupId: groupId, link: link, success: true }
        });
      } else {
        dispatch({
          type: ADD_USER,
          payload: {
            success: false,
            errorGroupCodeMessage: "You are already in this group!"
          }
        });
      }
    })
    .catch(() => {
      dispatch({
        type: ADD_USER,
        payload: {
          success: false,
          errorGroupCodeMessage: "An error has occured."
        }
      });
    });
};

const INITIAL_STATE = {
  code: "",
  groupId: "",
  link: "",
  success: false,
  errorGroupCodeMessage: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_USER: {
      return { ...state, ...action.payload };
    }
    case SET_CODE: {
      return { ...state, ...action.payload };
    }

    default: {
      return state;
    }
  }
};
