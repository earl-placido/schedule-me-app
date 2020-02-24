import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, mount, configure} from 'enzyme';
import configureStore from 'redux-mock-store';

import { GO_NEXT_PAGE, GO_PREVIOUS_PAGE, UPDATE_GROUP_DESCRIPTION, UPDATE_GROUP_NAME } from '../../actions/components/screens/CreateGroup.action';
import CreateGroup from '../../components/screens/CreateGroup/CreateGroup';

configure({adapter: new Adapter()});

describe('CreateGroup', () => {
  const initialState = {CreateGroupReducer: {groupName: 'groupName', groupDescription: 'groupDescription', success: true, currentPage: 0}};
  const mockStore = configureStore();
  let store, component;

  beforeEach(() => {
    store = mockStore(initialState);
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

  it('should run goNextPage in CreateGroup', () => {
    component.dive().find('#nextButton').simulate('click');
    console.log(store.getActions()[0]);
    expect(store.getActions()[0].type).toEqual(GO_NEXT_PAGE);
  });

  it('should run goPreviousPage in CreateGroup', () => {
    component.dive().find('#previousButton').simulate('click');
    expect(store.getActions()[0].type).toEqual(GO_PREVIOUS_PAGE);
  });

  it('should run updateGroupName in CreateGroup', () => {
    component.dive().find('GroupInfoForm').dive().find('#groupNameInput').simulate('change', {target: {value: 'changed'}});
    expect(store.getActions()[0].type).toEqual(UPDATE_GROUP_NAME);
  });

  it('should run updateGroupDescription in CreateGroup', () => {
    component.dive().find('GroupInfoForm').dive().find('#groupDescriptionInput').simulate('change', {target: {value: 'changed'}});
    expect(store.getActions()[0].type).toEqual(UPDATE_GROUP_DESCRIPTION);
  });

});
