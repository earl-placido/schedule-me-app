import axios from "axios";
import responses from "../../util/responses";

export const LOGIN_REQUEST = "login_request";
export const LOGIN_SUCCESS = "login_success";
export const LOGIN_ERROR = "login_error";
export const LOGOUT_SUCCESS = "logout_success";


//LOGIN WITH EMAIL
export const UPDATE_LOGIN_EMAIL = "update_login_email";
export const UPDATE_LOGIN_PASSWORD = "update_login_password";

//SIGNUP WITH EMAIL
export const UPDATE_SIGNUP_FNAME = "update_signup_fname";
export const UPDATE_SIGNUP_LNAME = "update_signup_lname";
export const UPDATE_SIGNUP_EMAIL = "update_signup_email";
export const UPDATE_SIGNUP_PASSWORD = "update_signup_password";

const INITIAL_STATE = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
  userName: localStorage.getItem("userName"),
  displayPicURL: localStorage.getItem("displayPicURL"),
  message: "",
  errored: false,
  loginEmail: '',
  loginPassword: '',
  signUpFname: '',
  signUpLname: '',
  signUpEmail: '',
  signUpPassword: ''
};

const checkAuth = () => {
  return {

  }
}

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const loginSuccess = (userName, displayPicURL, token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { userName, displayPicURL, token }
  };
};

const loginError = error => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const loginGoogle = response => {
  return dispatch => {
    dispatch(loginRequest());
    const options = {
      url: `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/auth/google`,
      method: "POST",
      data: { access_token: response.accessToken }
    };
    axios(options)
      .then(res => {
        if (res.status === responses.SUCCESS) {
          const token = res.headers["x-auth-token"];
          let userName = `${res.data.firstName} ${res.data.lastName}`;
          setUserData(token, userName, res.data.displayPicURL, res.data.email);

          dispatch(loginSuccess(userName, res.data.displayPicURL, token));
        } else {
          throw new Error(res.err);
        }
      })
      .catch(err => dispatch(loginError(err.message)));
  };
};

export const logoutGoogle = () => {
  return dispatch => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("displayPicURL");
    dispatch(logoutSuccess());
  };
};

function setUserData(token, userName, displayPicURL = null, userEmail) {
  localStorage.setItem("token", token);
  localStorage.setItem("userName", userName);
  localStorage.setItem("displayPicURL", displayPicURL);
  localStorage.setItem("userEmail", userEmail);

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

/****** Login With Email *******/
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

export const loginWithEmail = data => {  
    return dispatch => {
      dispatch(loginRequest());
      const options = {
        url: `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/auth/login`,
        method: "POST",
        data: data
      };
      axios(options)
        .then(res => {
          if (res.status === responses.SUCCESS) {
            const token = res.headers["x-auth-token"];
            let userName = `${res.data.firstName} ${res.data.lastName}`;
            setUserData(token, userName, res.data.displayPicURL, res.data.email);
            dispatch(loginSuccess(userName, res.data.displayPicURL, token));
          } else {
            throw new Error(res.err);
          }
        })
        .catch(err => dispatch(loginError(err.message)));
    };
}

/****** Sign Up with Email *******/
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


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        message: "Logging in"
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        message: "Login is successful",
        token: action.payload.token,
        userName: action.payload.userName,
        displayPicURL: action.payload.displayPicURL
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        errored: true,
        message: action.payload
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userName: null,
        displayPicURL: null
      };

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

    default:
      return state;
  }
};
