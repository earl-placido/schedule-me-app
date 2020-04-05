import React from 'react';
import CreateAccount from '../../../src/components/login/CreateAccount';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import t from 'tcomb-form-native';
import {Button} from 'native-base';
import Modal from 'react-native-modal';

const Form = t.form.Form;

configure({adapter: new Adapter()});

const props = {signupFields: {}, message: {}};
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

  it('Test if button renders', () => {
    expect(component.find(Button)).toHaveLength(1);
  });

  it('Test signup button press', () => {
    component.find('[accessibilityLabel="SignupButton"]').simulate('press');
    expect(component.state().isCreateVisible).toEqual(true);
  });
});
