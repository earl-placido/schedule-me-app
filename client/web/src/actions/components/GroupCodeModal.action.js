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
      const groupId = response.data.groupMembers[0].GroupId;
      if (response.data.groupMembers.length > 0) {
        dispatch({
          type: ADD_USER,
          payload: { groupId: groupId, success: true }
        });
      } else {
        dispatch({
          type: ADD_USER,
          payload: {
            success: false,
            errorGroupCodeMessage:
              "You have entered a group that does not exist"
          }
        });
      }
    })
    .catch(() => {
      dispatch({
        type: ADD_USER,
        payload: {
          success: false,
          errorGroupCodeMessage: "An error has occured"
        }
      });
    });
};

const INITIAL_STATE = {
  code: "",
  groupId: "",
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
      return INITIAL_STATE;
    }
  }
};
