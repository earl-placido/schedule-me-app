import React from 'react';
import Login from '../../../src/components/login/Login';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import t from 'tcomb-form-native';
import {Button} from 'native-base';
import {GoogleSigninButton} from '@react-native-community/google-signin';

const Form = t.form.Form;

configure({adapter: new Adapter()});

const props = {loginFields: {}, loginUser: jest.fn(), message: {}};
const setUp = (prop = props, store = {}) => {
  const component = shallow(<Login.WrappedComponent {...prop} {...store} />);
  return component;
};

describe('Testing <Login />', () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it('Test if <Login /> renders', () => {
    expect(component.length).toEqual(1);
  });

  it('Test if form renders', () => {
    expect(component.find(Form)).toHaveLength(1);
  });

  it('Test if button renders', () => {
    expect(component.find(Button)).toHaveLength(1);
  });

  it('Test if GoogleSignin button renders', () => {
    expect(component.find(GoogleSigninButton)).toHaveLength(1);
  });

  it('Test login button press', () => {
    component.instance().userLogin = jest.fn();
    component
      .findWhere(node => node.prop('accessibilityLabel') === 'LoginButton')
      .simulate('press');
    expect(component.instance().userLogin).toHaveBeenCalled();
  });

  it('Test login with values', () => {
    component.instance()['form'] = {
      getValue: () => jest.fn(),
    };
    component.instance().showToast = jest.fn();
    jest.useFakeTimers();
    component
      .findWhere(node => node.prop('accessibilityLabel') === 'LoginButton')
      .simulate('press');

    expect(component.state().isSigninInProgress).toEqual(true);
    expect(component.state().isSpinnerVisible).toEqual(true);
    jest.advanceTimersByTime(1000);
  });

  it('Test login without values', () => {
    component.instance()['form'] = {
      getValue: () => null,
    };
    jest.useFakeTimers();
    component
      .findWhere(node => node.prop('accessibilityLabel') === 'LoginButton')
      .simulate('press');

    expect(component.state().isSigninInProgress).toEqual(false);
    expect(component.state().isSpinnerVisible).toEqual(false);
    jest.advanceTimersByTime(1000);
  });

  it('Test login success', () => {
    component.instance()['form'] = {
      getValue: () => jest.fn(),
    };
    component.instance().showToast = jest.fn();
    jest.useFakeTimers();
    component
      .findWhere(node => node.prop('accessibilityLabel') === 'LoginButton')
      .simulate('press');
    jest.advanceTimersByTime(1000);

    expect(component.state().isSigninInProgress).toEqual(false);
    expect(component.state().isSpinnerVisible).toEqual(false);
  });

  it('Test login fail', () => {
    component.instance()['form'] = {
      getValue: () => null,
    };
    jest.useFakeTimers();
    component
      .findWhere(node => node.prop('accessibilityLabel') === 'LoginButton')
      .simulate('press');
    jest.advanceTimersByTime(1000);

    expect(component.state().isSigninInProgress).toEqual(false);
    expect(component.state().isSpinnerVisible).toEqual(false);
  });

  it('Test login authenticated', () => {
    component = setUp({
      ...props,
      isAuthenticated: true,
      navigation: {navigate: () => jest.fn()},
    });
    component.instance().showToast = jest.fn();
    component.instance().attemptLogin();
    expect(component.instance().showToast).toHaveBeenCalled();
  });

  it('Test login errors', () => {
    component = setUp({
      ...props,
      isAuthenticated: false,
      message: {
        errors: [{msg: 'msg'}],
      },
    });
    component.instance().showToast = jest.fn();
    component.instance().attemptLogin();
    expect(component.instance().showToast).toHaveBeenCalled();
  });

  it('Test login more errors', () => {
    component = setUp({
      ...props,
      isAuthenticated: false,
      message: {
        err: 'msg',
      },
    });
    component.instance().showToast = jest.fn();
    component.instance().attemptLogin();
    expect(component.instance().showToast).toHaveBeenCalled();
  });

  it('Test google login button press', () => {
    component.instance().googleLogin = jest.fn();
    component.find(GoogleSigninButton).simulate('press');
    expect(component.instance().googleLogin).toHaveBeenCalled();
  });
});
