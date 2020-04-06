import React from 'react';
import DrawerNavigator from '../../../src/components/navigation/DrawerNavigator';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {NavigationContainer} from '@react-navigation/native';

configure({adapter: new Adapter()});

const setUp = (prop = {}, store = {}) => {
  const component = shallow(
    <NavigationContainer>
      <DrawerNavigator.WrappedComponent {...prop} {...store} />
    </NavigationContainer>,
  );
  return component;
};

describe('Testing <DrawerNavigator />', () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it('Test if <DrawerNavigator /> renders', () => {
    expect(component.length).toEqual(1);
  });
});
