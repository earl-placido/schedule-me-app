import React from 'react';
import GroupShareCodeForm from '../../../src/components/groups/GroupShareCodeForm';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import t from 'tcomb-form-native';
import {Button} from 'native-base';

const Form = t.form.Form;

configure({adapter: new Adapter()});

const props = {navigation: {navigate: jest.fn(), push: jest.fn()}};

const setUp = () => {
  const component = shallow(<GroupShareCodeForm.WrappedComponent {...props}/>);
  return component;
};

describe('Testing <GroupShareCodeForm />', () => {
  let component;

   beforeEach(() => {
    component = setUp();
  });

  it('Test if <GroupShareCodeForm /> renders', () => {
    expect(component.length).toEqual(1);
  });

  it('Test if form renders', () => {
    expect(component.find(Form)).toHaveLength(1);
  });

  it('Test if buttons render', () => {
    expect(component.find(Button)).toHaveLength(2);
  });

  it('Test copy button press', () => {
    component.instance().copyCode = jest.fn();
    component
      .findWhere(node => node.prop('accessibilityLabel') === 'Copy Code')
      .simulate('press');
    expect(component.instance().copyCode).toHaveBeenCalled();
  });

  it('Test go to group button press', () => {
    // spies on the handle change func
    const handleChangeSpy = jest.spyOn(component.instance(), 'goToGroup');
    component.find(Button).at(1).props().onPress();

    expect(handleChangeSpy).toHaveBeenCalled();
    expect(props.navigation.push.mock.calls.length).toBe(1);
    expect(props.navigation.navigate.mock.calls.length).toBe(1);
  });
});

