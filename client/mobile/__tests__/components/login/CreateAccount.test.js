import React from 'react';
import CreateAccount from '../../../src/components/login/CreateAccount';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import t from 'tcomb-form-native';
import {Alert} from 'react-native';
import {Button} from 'native-base';
import Modal from 'react-native-modal';

const Form = t.form.Form;

configure({adapter: new Adapter()});

const props = {signupFields: {}, signupUser: jest.fn(), message: {}};
const setUp = (prop = props, store = {}) => {
  const component = shallow(
    <CreateAccount.WrappedComponent {...prop} {...store} />,
  );
  return component;
};

describe('Testing <CreateAccount />', () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it('Test if <CreateAccount /> renders', () => {
    expect(component.length).toEqual(1);
  });

  it('Test if modal renders', () => {
    expect(component.find(Modal)).toHaveLength(1);
  });

  it('Test if form renders', () => {
    expect(component.find(Form)).toHaveLength(1);
  });

  it('Test if button renders', () => {
    expect(component.find(Button)).toHaveLength(2);
  });

  it('Test signup button press', () => {
    component
      .findWhere(node => node.prop('accessibilityLabel') === 'Sign Up Button')
      .simulate('press');
    expect(component.state().isCreateVisible).toEqual(true);
  });

  it('Test signup with values', () => {
    component.instance()['form'] = {
      getValue: () => jest.fn(),
    };
    jest.useFakeTimers();
    component
      .findWhere(
        node => node.prop('accessibilityLabel') === 'Sign Up Submit Button',
      )
      .simulate('press');

    expect(component.state().isCreateVisible).toEqual(false);
    expect(component.state().isSpinnerVisible).toEqual(true);
    jest.advanceTimersByTime(1000);
  });

  it('Test signup without values', () => {
    component.instance()['form'] = {
      getValue: () => null,
    };
    jest.useFakeTimers();
    component
      .findWhere(
        node => node.prop('accessibilityLabel') === 'Sign Up Submit Button',
      )
      .simulate('press');

    expect(component.state().isCreateVisible).toEqual(false);
    expect(component.state().isSpinnerVisible).toEqual(false);
    jest.advanceTimersByTime(1000);
  });

  it('Test signup success', () => {
    component.instance()['form'] = {
      getValue: () => jest.fn(),
    };
    jest.useFakeTimers();
    component
      .findWhere(
        node => node.prop('accessibilityLabel') === 'Sign Up Submit Button',
      )
      .simulate('press');
    jest.advanceTimersByTime(1000);

    expect(component.state().isCreateVisible).toEqual(false);
    expect(component.state().isSpinnerVisible).toEqual(false);
  });

  it('Test signup fail', () => {
    component.instance()['form'] = {
      getValue: () => null,
    };
    jest.useFakeTimers();
    component
      .findWhere(
        node => node.prop('accessibilityLabel') === 'Sign Up Submit Button',
      )
      .simulate('press');
    jest.advanceTimersByTime(1000);

    expect(component.state().isCreateVisible).toEqual(false);
    expect(component.state().isSpinnerVisible).toEqual(false);
  });

  it('Test signup authenticated', () => {
    component = setUp({
      ...props,
      isAuthenticated: true,
      navigation: {navigate: () => jest.fn()},
    });
    component.instance().showToast = jest.fn();
    component.instance().attemptSignup();
    expect(component.instance().showToast).toHaveBeenCalled();
  });

  it('Test signup errors', () => {
    const msg = 'msg';
    Alert.alert = jest.fn();
    component = setUp({
      ...props,
      isAuthenticated: false,
      message: {
        errors: [{msg: msg}],
      },
    });
    component.instance().attemptSignup();
    expect(Alert.alert).toHaveBeenCalledWith("Couldn't sign you up\n", msg);
  });

  it('Test signup more errors', () => {
    const msg = 'msg';
    Alert.alert = jest.fn();
    component = setUp({
      ...props,
      isAuthenticated: false,
      message: {
        err: msg,
      },
    });
    component.instance().attemptSignup();
    expect(Alert.alert).toHaveBeenCalledWith("Couldn't sign you up\n", msg);
  });

  it('Test signup even more errors', () => {
    const msg = 'msg';
    Alert.alert = jest.fn();
    component = setUp({
      ...props,
      isAuthenticated: false,
      message: msg,
    });
    component.instance().attemptSignup();
    expect(Alert.alert).toHaveBeenCalledWith("Couldn't sign you up\n", msg);
  });
});
