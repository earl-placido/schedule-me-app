// import axios from 'axios';
// import responses from '../../util/responses';
// import Config from 'react-native-config';
// import AsyncStorage from '@react-native-community/async-storage';

// export const LOGIN_REQUEST = 'login_request';

// const INITIAL_STATE = {
//   isAuthenticated: false,
//   token: '',
//   userName: '',
//   message: '',
//   errored: false,
//   groups: {
//     groupId: '',
//     groupName: '',
//     groupDescription: '',
//   "GroupOwnerId": 13,
//   "LastUpdated": "2020-03-12T19:16:03.000Z",
//   "MeetingId": 5,
//   "MeetingDuration": "00:01:23",
//   "MeetingFrequency": "12",
//   "MeetingLocation": "123"
//   },
//   meetings: {

//   }
// };

// const loginRequest = loginFields => {
//   return {
//     type: LOGIN_REQUEST,
//     payload: loginFields,
//   };
// };

// export const getGroups = response => {
//   var loginFields = {
//     email: '',
//     password: '',
//   };

//   return dispatch => {
//     dispatch(loginRequest(loginFields));
//     const options = {
//       url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${dsf}`,
//       method: 'GET',
//       data: {access_token: response.accessToken},
//     };
//     axios(options)
//       .then(res => {
//         if (res.status === responses.SUCCESS) {
//           const token = res.headers['x-auth-token'];
//           let userName = `${res.data.firstName} ${res.data.lastName}`;

//           setUserData(token, userName);

//           dispatch(loginSuccess(userName, token));
//         } else {
//           throw new Error(res.err);
//         }
//       })
//       .catch(err => {
//         dispatch(loginError(err.message));
//       });
//   };
// };

// export const loginUser = (email, password) => {
//   var loginFields = {
//     email: email,
//     password: password,
//   };

//   return dispatch => {
//     dispatch(loginRequest(loginFields));
//     const options = {
//       url: `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/auth/login`,
//       method: 'POST',
//       data: {
//         email: email,
//         password: password,
//       },
//     };
//     axios(options)
//       .then(res => {
//         if (res.status === responses.SUCCESS) {
//           const token = res.headers['x-auth-token'];
//           let userName = `${res.data.firstName} ${res.data.lastName}`;

//           setUserData(token, userName);

//           dispatch(loginSuccess(userName, token));
//         } else {
//           throw new Error(res.err);
//         }
//       })
//       .catch(err => dispatch(loginError(err.response.data, loginFields)));
//   };
// };

// export const logoutUser = () => {
//   return async dispatch => {
//     await AsyncStorage.removeItem('token');
//     await AsyncStorage.removeItem('userName');
//     dispatch(logoutSuccess());
//   };
// };

// async function setUserData(token, userName) {
//   await AsyncStorage.setItem('token', token);
//   await AsyncStorage.setItem('userName', userName);
//   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

// export default (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       return {
//         ...state,
//         isAuthenticated: false,
//         message: 'Logging in',
//         loginFields: {
//           email: action.payload.email,
//           password: action.payload.password,
//         },
//       };

//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isAuthenticated: true,
//         message: 'Login is successful',
//         token: action.payload.token,
//         userName: action.payload.userName,
//         loginFields: {
//           email: '',
//           password: '',
//         },
//       };

//     case LOGIN_ERROR:
//       return {
//         ...state,
//         isAuthenticated: false,
//         errored: true,
//         message: action.payload.error,
//         loginFields: {
//           email: action.payload.loginFields.email,
//           password: action.payload.loginFields.password,
//         },
//       };

//     case SIGNUP_REQUEST:
//       return {
//         ...state,
//         isAuthenticated: false,
//         message: 'Signing in',
//         signupFields: {
//           firstName: action.payload.firstName,
//           lastName: action.payload.lastName,
//           email: action.payload.email,
//           password: action.payload.password,
//           confirmPassword: action.payload.confirmPassword,
//         },
//       };

//     case SIGNUP_SUCCESS:
//       return {
//         ...state,
//         isAuthenticated: true,
//         message: 'Signup is successful',
//         token: action.payload.token,
//         userName: action.payload.userName,
//         signupFields: {
//           firstName: '',
//           lastName: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//         },
//       };

//     case SIGNUP_ERROR:
//       return {
//         ...state,
//         isAuthenticated: false,
//         errored: true,
//         message: action.payload.error,
//         signupFields: {
//           firstName: action.payload.signupFields.firstName,
//           lastName: action.payload.signupFields.lastName,
//           email: action.payload.signupFields.email,
//           password: action.payload.signupFields.password,
//           confirmPassword: action.payload.signupFields.confirmPassword,
//         },
//       };

//     case LOGOUT_SUCCESS:
//       return {
//         ...state,
//         isAuthenticated: false,
//         token: '',
//         userName: '',
//       };

//     default:
//       return state;
//   }
// };
