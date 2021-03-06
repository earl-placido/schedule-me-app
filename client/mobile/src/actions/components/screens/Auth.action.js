import axios from 'axios';
import responses from '../../util/responses';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export const LOGIN_REQUEST = 'login_request';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_ERROR = 'login_error';
export const SIGNUP_REQUEST = 'signup_request';
export const SIGNUP_SUCCESS = 'signup_success';
export const SIGNUP_ERROR = 'signup_error';
export const LOGOUT_SUCCESS = 'logout_success';

const INITIAL_STATE = {
  isAuthenticated: false,
  token: '',
  userName: '',
  displayPicURL: '',
  message: '',
  errored: false,
};

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (userName, token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {userName, token},
  };
};

const loginError = error => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

const signupSuccess = (userName, token) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: {userName, token},
  };
};

const signupError = error => {
  return {
    type: SIGNUP_ERROR,
    payload: error,
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const loginGoogle = response => {
  return dispatch => {
    dispatch(loginRequest());
    const options = {
      url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/auth/google`,
      method: 'POST',
      data: {access_token: response.accessToken},
    };
    axios(options)
      .then(res => {
        if (res.status === responses.SUCCESS) {
          const token = res.headers['x-auth-token'];
          let userName = `${res.data.firstName} ${res.data.lastName}`;

          setUserData(token, userName, res.data.displayPicURL);

          dispatch(loginSuccess(userName, res.data.displayPicURL, token));
        } else {
          throw new Error(res.err);
        }
      })
      .catch(err => dispatch(loginError(err.message)));
  };
};

export const signupUser = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
) => {
  return dispatch => {
    dispatch(signupRequest());
    if (password == confirmPassword) {
      const options = {
        url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/auth/signup`,
        method: 'POST',
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
      };
      axios(options)
        .then(res => {
          console.log(res);
          if (res.status === responses.SUCCESS) {
            const token = res.headers['x-auth-token'];
            let userName = `${res.data.firstName} ${res.data.lastName}`;

            setUserData(token, userName, res.data.displayPicURL);

            dispatch(signupSuccess(userName, res.data.displayPicURL, token));
          } else {
            throw new Error(res.err);
          }
        })
        .catch(err => dispatch(signupError(err.message)));
    } else {
      dispatch(signupError('Password mismatch'));
    }
  };
};

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch(signupRequest());
    const options = {
      url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/auth/login`,
      method: 'POST',
      data: {
        email: email,
        password: password,
      },
    };
    axios(options)
      .then(res => {
        if (res.status === responses.SUCCESS) {
          const token = res.headers['x-auth-token'];
          let userName = `${res.data.firstName} ${res.data.lastName}`;

          setUserData(token, userName, res.data.displayPicURL);

          dispatch(signupSuccess(userName, res.data.displayPicURL, token));
        } else {
          throw new Error(res.err);
        }
      })
      .catch(err => dispatch(loginError(err.message)));
  };
};

export const logoutUser = () => {
  return async dispatch => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('displayPicURL');
    dispatch(logoutSuccess());
  };
};

async function setUserData(token, userName, displayPicURL = null) {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('userName', userName);
  await AsyncStorage.setItem('displayPicURL', displayPicURL);

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        message: 'Logging in',
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        message: 'Login is successful',
        token: action.payload.token,
        userName: action.payload.userName,
        displayPicURL: action.payload.displayPicURL,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        errored: true,
        message: action.payload,
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        message: 'Signing in',
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        message: 'Signup is successful',
        token: action.payload.token,
        userName: action.payload.userName,
        displayPicURL: action.payload.displayPicURL,
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        errored: true,
        message: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userName: null,
        displayPicURL: null,
      };

    default:
      return state;
  }
};
