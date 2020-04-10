import React from 'react';
import MeetingModal from '../../../src/components/meeting/MeetingModal';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Button} from 'native-base';

configure({adapter: new Adapter()});

const props = {handleGroupName: jest.fn(), handleGroupDescription: jest.fn()};

const setUp = () => {
  const component = shallow(<MeetingModal.WrappedComponent {...props}/>);
  return component;
};

describe('Testing <MeetingModal />', () => {
  let component;

   beforeEach(() => {
    component = setUp();
  });

  it('Test if <MeetingModal /> renders', () => {
    expect(component.length).toEqual(1);
  });

  it('Test if <Button /> renders', () => {
    expect(component.find(Button)).toHaveLength(1);
  });
});
