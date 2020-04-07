import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import configureMockStore from 'redux-mock-store';

import {
  logoutUser,
  loginGoogle,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  loginUser,
  signupUser,
  SIGNUP_REQUEST,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOGOUT_SUCCESS,
} from '../../src/actions/Auth.action';

describe('test auth action', () => {
  let httpMock, store;
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('test login google', async () => {
    const response = {accessToken: null};
    const loginFields = {
      email: '',
      password: '',
    };

    httpMock
      .onPost(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/auth/google`, {
        access_token: response.accessToken,
      })
      .reply(
        200,
        {firstName: 'first', lastName: 'last', email: 'email'},
        {'x-auth-token': 'token'},
      );

    await loginGoogle(response)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(LOGIN_REQUEST);
    expect(store.getActions()[0].payload).toEqual(loginFields);
    expect(store.getActions()[1].type).toEqual(LOGIN_SUCCESS);
    expect(store.getActions()[1].payload).toEqual({
      userName: 'first last',
      token: 'token',
    });

    expect(await AsyncStorage.getItem('token')).toEqual('token');
    expect(await AsyncStorage.getItem('userName')).toEqual('first last');
    expect(await AsyncStorage.getItem('userEmail')).toEqual('email');

    // handle bad path
    store.clearActions();
    httpMock
      .onPost(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/auth/google`, {
        access_token: response.accessToken,
      })
      .reply(500);
    await loginGoogle(response)(store.dispatch);
    await flushAllPromises();

    expect(store.getActions()[0].type).toEqual(LOGIN_REQUEST);
    expect(store.getActions()[0].payload).toEqual(loginFields);
    expect(store.getActions()[1].type).toEqual(LOGIN_ERROR);
    expect(store.getActions()[1].payload).toEqual({
      error: 'Cannot connect to server',
      loginFields,
    });
  });

  it('test login user', async () => {
    const response = {accessToken: null};
    const email = 'email';
    const password = 'password';
    const loginFields = {
      email: '',
      password: '',
    };

    httpMock
      .onPost(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/auth/login`, {
        email,
        password,
      })
      .reply(
        200,
        {firstName: 'first', lastName: 'last', email: 'email'},
        {'x-auth-token': 'token'},
      );

    await loginUser(email, password)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(LOGIN_REQUEST);
    expect(store.getActions()[0].payload).toEqual({email, password});
    expect(store.getActions()[1].type).toEqual(LOGIN_SUCCESS);
    expect(store.getActions()[1].payload).toEqual({
      userName: 'first last',
      token: 'token',
    });

    expect(await AsyncStorage.getItem('token')).toEqual('token');
    expect(await AsyncStorage.getItem('userName')).toEqual('first last');
    expect(await AsyncStorage.getItem('userEmail')).toEqual('email');

    // handle bad path
    store.clearActions();
    httpMock
      .onPost(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/auth/google`, {
        access_token: response.accessToken,
      })
      .reply(500);
    await loginGoogle(response)(store.dispatch);
    await flushAllPromises();

    expect(store.getActions()[0].type).toEqual(LOGIN_REQUEST);
    expect(store.getActions()[0].payload).toEqual(loginFields);
    expect(store.getActions()[1].type).toEqual(LOGIN_ERROR);
    expect(store.getActions()[1].payload).toEqual({
      error: 'Cannot connect to server',
      loginFields,
    });
  });

  it('test signup user', async () => {
    const firstName = 'first';
    const lastName = 'last';
    const email = 'email';
    const password = 'password';
    let confirmPassword = 'wrongpassword';
    const signupFields = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    // handle wrong password
    await signupUser(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    )(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(SIGNUP_REQUEST);
    expect(store.getActions()[0].payload).toEqual(signupFields);
    expect(store.getActions()[1].type).toEqual(SIGNUP_ERROR);
    expect(store.getActions()[1].payload).toEqual({
      error: 'Password mismatch',
      signupFields,
    });

    // handle error response
    confirmPassword = 'password';
    signupFields.confirmPassword = confirmPassword;
    store.clearActions();
    httpMock
      .onPost(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/auth/signup`)
      .reply(500, 'error');
    await signupUser(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    )(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(SIGNUP_REQUEST);
    expect(store.getActions()[0].payload).toEqual(signupFields);
    expect(store.getActions()[1].type).toEqual(SIGNUP_ERROR);
    expect(store.getActions()[1].payload).toEqual({
      error: 'error',
      signupFields,
    });

    // handle success
    store.clearActions();
    httpMock
      .onPost(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/auth/signup`)
      .reply(200, signupFields, {'x-auth-token': 'token'});
    await signupUser(
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    )(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(SIGNUP_REQUEST);
    expect(store.getActions()[0].payload).toEqual(signupFields);
    expect(store.getActions()[1].type).toEqual(SIGNUP_SUCCESS);
    expect(store.getActions()[1].payload).toEqual({
      userName: 'first last',
      token: 'token',
    });
    expect(await AsyncStorage.getItem('token')).toEqual('token');
    expect(await AsyncStorage.getItem('userName')).toEqual('first last');
    expect(await AsyncStorage.getItem('userEmail')).toEqual('email');
  });

  it('test logout', async () => {
    expect(await AsyncStorage.getItem('token')).toEqual('token');
    expect(await AsyncStorage.getItem('userName')).toEqual('first last');
    expect(await AsyncStorage.getItem('displayPicURL')).toEqual(null);
    expect(await AsyncStorage.getItem('userEmail')).toEqual('email');

    logoutUser()(store.dispatch);
    await flushAllPromises();

    expect(store.getActions()[0].type).toEqual(LOGOUT_SUCCESS);
    expect(await AsyncStorage.getItem('token')).toEqual(null);
    expect(await AsyncStorage.getItem('userName')).toEqual(null);
    expect(await AsyncStorage.getItem('displayPicURL')).toEqual(null);
  });
});
