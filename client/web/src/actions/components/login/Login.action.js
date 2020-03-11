export const TOGGLE_MODAL = "toggle_modal";

//LOGIN
export const UPDATE_LOGIN_EMAIL = "update_login_email";
export const UPDATE_LOGIN_PASSWORD = "update_login_password";

//SIGNUP
export const UPDATE_SIGNUP_FNAME = "update_signup_fname";
export const UPDATE_SIGNUP_LNAME = "update_signup_lname";
export const UPDATE_SIGNUP_EMAIL = "update_signup_email";
export const UPDATE_SIGNUP_PASSWORD = "update_signup_password";
export const UPDATE_SIGNUP_CONF_PASSWORD = "update_signup_conf_password";

/****** Login Actions *******/
export const updateLoginEmail = email => {
  return {
    type: UPDATE_LOGIN_EMAIL,
    payload: email
  };
};

export const updateLoginPassword = password => {
  return {
    type: UPDATE_LOGIN_PASSWORD,
    payload: password
  };
};

/****** Modal Action *******/
export const toggleModal = value => {
  return {
    type: TOGGLE_MODAL,
    payload: value
  };
};

const INITIAL_STATE = { 
  modalVisible: false,
  loginEmail: '',
  loginPassword: '' 
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_MODAL: {
      return { ...state, modalVisible: action.payload };
    }

    case UPDATE_LOGIN_EMAIL: {
      return { ...state, update_login_email : action.payload };
    }

    case UPDATE_LOGIN_PASSWORD: {
      return { ...state, update_login_password : action.payload };   
    }

    default: {
      return INITIAL_STATE;
    }
  }
};
