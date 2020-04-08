import React from 'react';
import Home from '../../../src/components/screens/LoginScreen';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import Login from '../../../src/components/login/Login';
import CreateAccount from '../../../src/components/login/CreateAccount';

configure({adapter: new Adapter()});

describe('Testing <Home />', () => {
  let component;
  const mockStore = configureStore();
  const store = mockStore({
    auth: {},
  });

  beforeEach(() => {
    component = shallow(<Home store={store} />).dive();
  });

  it('Test if <Home /> renders', () => {
    expect(component.length).toEqual(1);
  });

  it('Test if <Login /> renders', () => {
    expect(component.dive().find(Login)).toHaveLength(1);
  });

  it('Test if <CreateAccount /> renders', () => {
    expect(component.dive().find(CreateAccount)).toHaveLength(1);
  });
});
