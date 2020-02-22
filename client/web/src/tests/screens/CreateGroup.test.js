import React from 'react';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import configureStore from 'redux-mock-store';

import CreateGroup from '../../components/screens/CreateGroup/CreateGroup';

configure({adapter: new Adapter()});

describe('CreateGroup', () => {
  const initialState = {groupName: 'groupName', groupDescription: 'groupDescription', success: true, currentPage: 0};
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<Provider store={store}><CreateGroup /></Provider>);
  });

  it('should render CreateGroup', () => {
    expect(container.length).toEqual(1);
  });
  
});
