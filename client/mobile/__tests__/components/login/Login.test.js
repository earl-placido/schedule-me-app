import React from 'react';
import Login from '../../../src/components/login/Login';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import t from 'tcomb-form-native';
import {Button} from 'native-base';
import {GoogleSigninButton} from '@react-native-community/google-signin';
const Form = t.form.Form;

configure({adapter: new Adapter()});

const setUp = (
  props = {loginFields: {}, loginUser: jest.fn(), message: {}},
  store = {},
) => {
  const component = shallow(<Login.WrappedComponent {...props} {...store} />);
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

  it('Test Login button press', () => {
    component.instance()['form'] = {
      getValue: () => jest.fn(),
    };
    component.find('[accessibilityLabel="LoginButton"]').simulate('press');
    expect(component.state().isSigninInProgress).toEqual(true);
    expect(component.state().isSpinnerVisible).toEqual(true);
  });

  it('Test Login button success', () => {
    component.instance()['form'] = {
      getValue: () => jest.fn(),
    };
    jest.useFakeTimers();
    component.find('[accessibilityLabel="LoginButton"]').simulate('press');
    jest.advanceTimersByTime(1000);
    expect(component.state().isSigninInProgress).toEqual(false);
    expect(component.state().isSpinnerVisible).toEqual(false);
  });
});
