import React from 'react';
import Home from '../../../../src/components/screens/Home/Home';

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import {Alert} from 'react-native';
import {Button} from 'native-base';
import Login from '../../../../src/components/login/Login';
import CreateAccount from '../../../../src/components/login/CreateAccount';
import Divider from '../../../../src/components/styles/Divider';

configure({adapter: new Adapter()});

describe('Testing <Home />', () => {
  let wrapper;
  const mockStore = configureStore();
  const store = mockStore({
    auth: {},
  });

  beforeEach(() => {
    wrapper = shallow(<Home store={store} />).dive();
  });

  it('Test if component renders properly', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('Test if core child components are rendered', () => {
    expect(wrapper.dive().find(Login)).toHaveLength(1);
    expect(wrapper.dive().find(CreateAccount)).toHaveLength(1);
    expect(wrapper.dive().find(Button)).toHaveLength(1);
    expect(
      wrapper
        .dive()
        .find(Divider)
        .props().message,
    ).toEqual('or');
  });

  it('Test if button works', () => {
    Alert.alert = jest.fn();
    wrapper
      .dive()
      .find(Button)
      .simulate('press');
    expect(Alert.alert).toHaveBeenCalledWith(
      'This feature is not yet available',
    );
  });
});
