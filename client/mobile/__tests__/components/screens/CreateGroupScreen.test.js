import React from 'react';
import CreateGroupScreen from '../../../src/components/screens/CreateGroupScreen';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';

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
  const component = shallow(<CreateGroupScreen.WrappedComponent prop={props}/>);
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

});

