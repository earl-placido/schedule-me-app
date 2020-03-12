export const TOGGLE_MODAL = "toggle_modal";

//LOGIN
export const UPDATE_LOGIN_EMAIL = "update_login_email";
export const UPDATE_LOGIN_PASSWORD = "update_login_password";

//SIGNUP
export const UPDATE_SIGNUP_FNAME = "update_signup_fname";
export const UPDATE_SIGNUP_LNAME = "update_signup_lname";
export const UPDATE_SIGNUP_EMAIL = "update_signup_email";
export const UPDATE_SIGNUP_PASSWORD = "update_signup_password";

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

// export const loginWithEmail = data => {  
//     return dispatch => {
//       const options = {
//         url: `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/auth/login`,
//         method: "POST",
//         data: data
//       };
//       axios(options)
//         .then(res => {
//           if (res.status === responses.SUCCESS) {
//             const token = res.headers["x-auth-token"];
//             let userName = `${res.data.firstName} ${res.data.lastName}`;
//             setUserData(token, userName, res.data.displayPicURL, res.data.email);
  
//             dispatch(loginSuccess(userName, res.data.displayPicURL, token));
//           } else {
//             throw new Error(res.err);
//           }
//         })
//         .catch(err => dispatch(loginError(err.message)));
//     };
// }

/****** Sign Up Actions *******/
export const updateSignUpFirstName = fname => {
  return {
    type: UPDATE_SIGNUP_FNAME,
    payload: fname
  };
};

export const updateSignUpLastName = lname => {
  return {
    type: UPDATE_SIGNUP_LNAME,
    payload: lname
  };
};

export const updateSignUpEmail = email => {
  return {
    type: UPDATE_SIGNUP_EMAIL,
    payload: email
  };
};

export const updateSignUpPassword = password => {
  return {
    type: UPDATE_SIGNUP_PASSWORD,
    payload: password
  };
};

export const SignUpWithEmail = response => {

}


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
  loginPassword: '',
  signUpFname: '',
  signUpLname: '',
  signUpEmail: '',
  signUpPassword: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_MODAL: {
      return { ...state, modalVisible: action.payload };
    }

    case UPDATE_LOGIN_EMAIL: {
      return { ...state, update_login_email: action.payload };
    }

    case UPDATE_LOGIN_PASSWORD: {
      return { ...state, update_login_password: action.payload };
    }

    case UPDATE_SIGNUP_FNAME: {
      return { ...state, update_signup_fname: action.payload };
    }

    case UPDATE_SIGNUP_LNAME: {
      return { ...state, update_signup_lname: action.payload };
    }

    case UPDATE_SIGNUP_EMAIL: {
      return { ...state, update_signup_email: action.payload };
    }

    case UPDATE_SIGNUP_PASSWORD: {
      return { ...state, update_signup_password: action.payload };
    }

    default: {
      return INITIAL_STATE;
    }
  }
};
