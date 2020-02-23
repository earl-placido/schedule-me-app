import React from 'react';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, mount, configure} from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import CreateGroup from '../../components/screens/CreateGroup/CreateGroup';

configure({adapter: new Adapter()});

describe('CreateGroup', () => {
  const initialState = {CreateGroupReducer: {groupName: 'groupName', groupDescription: 'groupDescription', success: true, currentPage: 0}};
  const mockStore = configureStore();
  let store, component;

  store = mockStore(initialState);
  component = shallow(<CreateGroup store={store} />).dive();
  // beforeEach(() => {
  //   store = mockStore(initialState);
  //   container = shallow(<CreateGroup store={store} />);
  //   console.log(container);
  // });


  it('should render CreateGroup', () => {
    expect(component.length).toEqual(1);
  });

  it('should contain appropriate properties from redux', () => {
      expect(component.props().groupName).toEqual('groupName');
      expect(component.props().groupDescription).toEqual('groupDescription');
      expect(component.props().success).toEqual(true);
      expect(component.props().currentPage).toEqual(0);
  });
  
  
});
