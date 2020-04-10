import React from 'react';
import CreateGroupScreen from '../../../src/components/screens/CreateGroupScreen';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';

import GroupInfoForm from '../../../src/components/groups/GroupInfoForm';
import GroupMeetingForm from '../../../src/components/groups/GroupMeetingForm';
import GroupShareCodeForm from '../../../src/components/groups/GroupShareCodeForm';

configure({adapter: new Adapter()});

const props = {
    submitMeetingCreation: jest.fn(), 
    resetCreateGroup: jest.fn(), 
    navigation: {
        navigate: jest.fn(), 
        push: jest.fn()
    },
    groupName: "groupName",
    groupDescription: "groupDescription",
    duration: "duration",
    frequency: "frequency",
    location: "location",
}

const setUp = () => {
  const component = shallow(<CreateGroupScreen.WrappedComponent {...props}/>);
  return component;
};

describe('Testing <CreateGroupScreen />', () => {
  let component;

   beforeEach(() => {
    component = setUp();
  });

  it('Test if <CreateGroupScreen /> renders', () => {
    expect(component.length).toEqual(1);
  });

  it('Test if <ProgressSteps /> renders', () => {
    expect(component.find(ProgressSteps)).toHaveLength(1);
  });

  it('Test if <ProgressStep /> renders', () => {
    expect(component.find(ProgressStep)).toHaveLength(3);
  });

  it('Test if <GroupInfoForm /> renders', () => {
    expect(component.find(GroupInfoForm)).toHaveLength(1);
  });

  it('Test if <GroupMeetingForm /> renders', () => {
    expect(component.find(GroupMeetingForm)).toHaveLength(1);
  });

  it('Test if <GroupShareCodeForm /> renders', () => {
    expect(component.find(GroupShareCodeForm)).toHaveLength(1);
  });
  
  it('Test submit meeting', () => {
    component.instance().createNewMeeting();
    expect(props.submitMeetingCreation.mock.calls.length).toBe(1);
    expect(props.resetCreateGroup.mock.calls.length).toBe(1);
  });
});

