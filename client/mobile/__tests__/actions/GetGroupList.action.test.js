import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Config from 'react-native-config';
import configureMockStore from 'redux-mock-store';
import {
  getGroupList,
  GET_GROUP_LIST_SUCCESS,
} from '../../src/actions/GetGroupList.action';

describe('test get group list action', () => {
  let httpMock, store;

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('test getGroupList action', async () => {
    // handle error response
    httpMock
      .onGet(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`)
      .reply(500);
    await getGroupList()(store.dispatch);
    expect(store.getActions()[0]).toEqual(undefined);

    // handle happy path
    store.clearActions();
    httpMock
      .onGet(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`)
      .reply(200, {groups: [1, 2]});
    await getGroupList()(store.dispatch);
    expect(store.getActions()[0].type).toEqual(GET_GROUP_LIST_SUCCESS);
    expect(store.getActions()[0].payload).toEqual([1, 2]);
  });
});
