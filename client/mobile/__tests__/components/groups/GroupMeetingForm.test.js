import React from 'react';
import GroupMeetingInfo from '../../../src/components/groups/GroupMeetingForm';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import t from 'tcomb-form-native';

const Form = t.form.Form;

configure({adapter: new Adapter()});

const props = {handleMeetingDuration: jest.fn(), handleMeetingFrequency: jest.fn(), handleMeetingLocation: jest.fn()};
const setUp = () => {
  const component = shallow(<GroupMeetingInfo {...props}/>);
  return component;
};

describe('Testing <GroupMeetingInfo />', () => {
  let component;

   beforeEach(() => {
    component = setUp();
  });

  it('Test if <GroupMeetingInfo /> renders', () => {
    expect(component.length).toEqual(1);
  });

  it('Test if form renders', () => {
    expect(component.find(Form)).toHaveLength(1);
  });

  it('Test if handleGroupMeetingChange is called', () => {
    // spies on the handle change func
    const handleChangeSpy = jest.spyOn(component.instance(), 'handleGroupMeetingChange');

    // fake getValue return()
    const getValue = jest.fn();

    getValue.mockReturnValue({duration: "1", frequency: "2", location: "test"});
    component.instance()['form'] = {
        getValue: () => getValue,
    };
    component.find(Form).first().props().onChange();

    expect(handleChangeSpy).toHaveBeenCalled();
    expect(props.handleMeetingDuration.mock.calls.length).toBe(1);
    expect(props.handleMeetingFrequency.mock.calls.length).toBe(1);
    expect(props.handleMeetingLocation.mock.calls.length).toBe(1);
  });
});
