import React from 'react';
import GroupScreen from '../../../src/components/screens/GroupScreen';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';

configure({adapter: new Adapter()});

const setUp = (props = {}) => {
  const component = shallow(<GroupScreen.WrappedComponent {...props} />);
  return component;
};

describe('Testing AvailabilityModal', () => {
  let component, props;
  beforeEach(() => {
    props = {};
    component = setUp(props);
  });

  it("Tests if component and it's children render", () => {
    expect(component.length).toEqual(1);
  });
});
