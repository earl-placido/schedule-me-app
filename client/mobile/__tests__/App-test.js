/**
 * @format
 */

import 'react-native';
import React from 'react';
import Root from '../index.js';
import App from '../src/App.js';

import {YellowBox} from 'react-native';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

configure({adapter: new Adapter()});

YellowBox.ignoreWarnings(['Warning: ...']);

jest.useFakeTimers();

const setUp = (props = {}, store = {}) => {
  const component = shallow(<App.WrappedComponent {...props} {...store} />);
  return component;
};

describe('Test app', () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it('Renders correctly', () => {
    const mockStore = configureStore();
    const store = mockStore({
      auth: {},
    });
    const wrapper = shallow(<Root store={store} />).dive();
    expect(wrapper.dive().find(App)).toHaveLength(1);
  });

  it('Test unauthenticaed', () => {
    const mockStore = configureStore();
    const store = mockStore({
      auth: {},
    });
    component = setUp({isAuthenticated: false}, store);

    expect(
      component
        .findWhere(node => node.prop('accessibilityLabel') === 'AuthStack')
        .prop('initialRouteName'),
    ).toEqual('Home');
  });

  it('Test authenticated', () => {
    const mockStore = configureStore();
    const store = mockStore({
      auth: {},
    });
    component = setUp({isAuthenticated: true}, store);

    expect(
      component
        .findWhere(node => node.prop('accessibilityLabel') === 'AuthStack')
        .prop('initialRouteName'),
    ).toEqual('Drawer');
  });
});
