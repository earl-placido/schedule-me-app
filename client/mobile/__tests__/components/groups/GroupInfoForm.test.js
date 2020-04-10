import React from 'react';
import GroupInfoForm from '../../../src/components/groups/GroupInfoForm';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import t from 'tcomb-form-native';

const Form = t.form.Form;

configure({adapter: new Adapter()});

const props = {handleGroupName: jest.fn(), handleGroupDescription: jest.fn()};
const setUp = () => {
  const component = shallow(<GroupInfoForm {...props}/>);
  return component;
};

describe('Testing <GroupInfoForm />', () => {
  let component;

   beforeEach(() => {
    component = setUp();
  });

  it('Test if <GroupInfoForm /> renders', () => {
    expect(component.length).toEqual(1);
  });

  it('Test if form renders', () => {
    expect(component.find(Form)).toHaveLength(1);
  });

  it('Test if handleGroupInfoChange is called', () => {
    // spies on the handle change func
    const handleChangeSpy = jest.spyOn(component.instance(), 'handleGroupInfoChange');

    // fake getValue return()
    const getValue = jest.fn();

    getValue.mockReturnValue({groupName: "Test", groupDescription: "Test"});
    component.instance()['form'] = {
        getValue: () => getValue,
    };
    component.find(Form).first().props().onChange();

    expect(handleChangeSpy).toHaveBeenCalled();
    expect(props.handleGroupName.mock.calls.length).toBe(1);
  });
});
