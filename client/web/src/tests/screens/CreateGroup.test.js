import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, mount, configure} from 'enzyme';
import configureStore from 'redux-mock-store';

import { goNextPage } from '../../actions/components/screens/CreateGroup.action';
import CreateGroup from '../../components/screens/CreateGroup/CreateGroup';

configure({adapter: new Adapter()});

describe('CreateGroup', () => {
  const initialState = {CreateGroupReducer: {groupName: 'groupName', groupDescription: 'groupDescription', success: true, currentPage: 0}};
  const mockStore = configureStore();
  let store, component;

  beforeEach(() => {
    store = mockStore(initialState);
  // mapDispatchProps contains updateGroupName, updateGroupDescription, goNextPage, goPreviousPage
    component = shallow(
    <CreateGroup store={store}/>).dive();
  });


  it('should render CreateGroup', () => {
    expect(component.length).toEqual(1);
  });

  it('should contain appropriate properties from redux', () => {
      expect(component.props().groupName).toEqual('groupName');
      expect(component.props().groupDescription).toEqual('groupDescription');
      expect(component.props().success).toEqual(true);
      expect(component.props().currentPage).toEqual(0);
  });

  it('should run expected action props from redux', () => {
    component.dive().find('#nextButton').simulate('click');
    expect(store.getActions()[0].payload).toEqual({success: true, currentPage:1 });
  });

  
});
