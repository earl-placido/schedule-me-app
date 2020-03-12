import axios from "axios";
import responses from "../../util/responses";

export const LOGIN_REQUEST = "login_request";
export const LOGIN_SUCCESS = "login_success";
export const LOGIN_ERROR = "login_error";
export const LOGOUT_SUCCESS = "logout_success";


const INITIAL_STATE = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
  userName: localStorage.getItem("userName"),
  displayPicURL: localStorage.getItem("displayPicURL"),
  message: "",
  errored: false,

};

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

export const authenticate = (type, response) => {
  return dispatch => {
    dispatch(loginRequest());
    let options = {}
    switch(type){
      case 'google':
        options = {
          url: `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/auth/google`,
          method: "POST",
          data: { access_token: response.accessToken }
        };
        break

      case 'login':
        options = {
          url: `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/auth/login`,
          method: "POST",
          data: response
        };
        break

      case 'signup':
        options = {
          url: `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/auth/signup`,
          method: "POST",
          data: response
        };
        break

      default:
        dispatch(loginError("Unsuported authentication type specified!"))  
    }

    axios(options)
      .then(res => {
        console.log(res);
        if (res.status === responses.SUCCESS) {
          const token = res.headers["x-auth-token"];
          let userName = `${res.data.firstName} ${res.data.lastName}`;
          setUserData(token, userName, res.data.displayPicURL, res.data.email);

          dispatch(loginSuccess(userName, res.data.displayPicURL, token));
        } else {
          console.log(res.err)
          throw new Error(res.err); 
        }
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(loginError(err.response.data.err))
      });
  };
};

export const logout = () => {
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

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        message: "Authenticating"
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        errored: false,
        isAuthenticated: true,
        message: "Login is successful!",
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

    default:
      return state;
  }
};
