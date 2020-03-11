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
  message: '',
  errored: false,
  signupFields: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  loginFields: {
    email: '',
    password: '',
  },
};

const loginRequest = loginFields => {
  return {
    type: LOGIN_REQUEST,
    payload: loginFields,
  };
};

const loginSuccess = (userName, token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {userName, token},
  };
};

const loginError = (error, loginFields) => {
  return {
    type: LOGIN_ERROR,
    payload: {error, loginFields},
  };
};

const signupRequest = signupFields => {
  return {
    type: SIGNUP_REQUEST,
    payload: signupFields,
  };
};

const signupSuccess = (userName, token) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: {userName, token},
  };
};

const signupError = (error, signupFields) => {
  return {
    type: SIGNUP_ERROR,
    payload: {error, signupFields},
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const loginGoogle = response => {
  var loginFields = {
    email: '',
    password: '',
  };

  return dispatch => {
    dispatch(loginRequest(loginFields));
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

          setUserData(token, userName);

          dispatch(loginSuccess(userName, token));
        } else {
          throw new Error(res.err);
        }
      })
      .catch(err => {
        dispatch(loginError(err.message));
      });
  };
};

export const signupUser = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
) => {
  var signupFields = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  return dispatch => {
    dispatch(signupRequest(signupFields));
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
          if (res.status === responses.SUCCESS) {
            const token = res.headers['x-auth-token'];
            let userName = `${res.data.firstName} ${res.data.lastName}`;

            setUserData(token, userName);

            dispatch(signupSuccess(userName, token));
          } else {
            throw new Error(res.err);
          }
        })
        .catch(err => dispatch(signupError(err.response.data, signupFields)));
    } else {
      dispatch(signupError('Password mismatch', signupFields));
    }
  };
};

export const loginUser = (email, password) => {
  var loginFields = {
    email: email,
    password: password,
  };

  return dispatch => {
    dispatch(loginRequest(loginFields));
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

          setUserData(token, userName);

          dispatch(loginSuccess(userName, token));
        } else {
          throw new Error(res.err);
        }
      })
      .catch(err => dispatch(loginError(err.response.data, loginFields)));
  };
};

export const logoutUser = () => {
  return async dispatch => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userName');
    dispatch(logoutSuccess());
  };
};

async function setUserData(token, userName) {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('userName', userName);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        message: 'Logging in',
        loginFields: {
          email: action.payload.email,
          password: action.payload.password,
        },
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        message: 'Login is successful',
        token: action.payload.token,
        userName: action.payload.userName,
        loginFields: {
          email: '',
          password: '',
        },
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        errored: true,
        message: action.payload.error,
        loginFields: {
          email: action.payload.loginFields.email,
          password: action.payload.loginFields.password,
        },
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        message: 'Signing in',
        signupFields: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          password: action.payload.password,
          confirmPassword: action.payload.confirmPassword,
        },
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        message: 'Signup is successful',
        token: action.payload.token,
        userName: action.payload.userName,
        signupFields: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        errored: true,
        message: action.payload.error,
        signupFields: {
          firstName: action.payload.signupFields.firstName,
          lastName: action.payload.signupFields.lastName,
          email: action.payload.signupFields.email,
          password: action.payload.signupFields.password,
          confirmPassword: action.payload.signupFields.confirmPassword,
        },
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: '',
        userName: '',
      };

    default:
      return state;
  }
};
