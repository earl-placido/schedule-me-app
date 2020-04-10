import { addUserToGroupQuery, getGroupQuery } from "../Group.action";

export const ADD_USER = "add_user";
export const SET_CODE = "set_code";
export const RESET_STATE = "reset_state";

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
        getGroupQuery(groupId)
          .then(response => {
            const link = `${window.location.origin}/groups/${groupId}/`;
            dispatch({
              type: ADD_USER,
              payload: {
                groupName: response.data.GroupName,
                link: link,
                success: true
              }
            });
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
    .catch(e => {
      if (e.response.status === 400) {
        dispatch({
          type: ADD_USER,
          payload: {
            success: false,
            errorGroupCodeMessage: "The group code does not exist."
          }
        });
      } else {
        dispatch({
          type: ADD_USER,
          payload: {
            success: false,
            errorGroupCodeMessage: "An error has occured."
          }
        });
      }
    });
};

export const resetState = () => async dispatch => {
  dispatch({
    type: RESET_STATE,
    payload: {
      code: "",
      groupName: "",
      link: "",
      success: false,
      errorGroupCodeMessage: ""
    }
  });
};

const INITIAL_STATE = {
  code: "",
  groupName: "",
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
    case RESET_STATE: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};
