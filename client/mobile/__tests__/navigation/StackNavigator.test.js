import React from 'react';
import StackNavigator from '../../src/navigation/DrawerNavigator';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {NavigationContainer} from '@react-navigation/native';

configure({adapter: new Adapter()});

const setUp = (prop = {}, store = {}) => {
  const component = shallow(
    <NavigationContainer>
      <StackNavigator.WrappedComponent {...prop} {...store} />
    </NavigationContainer>,
  );
  return component;
};

describe('Testing <StackNavigator />', () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it('Test if <StackNavigator /> renders', () => {
    expect(component.length).toEqual(1);
  });
});
