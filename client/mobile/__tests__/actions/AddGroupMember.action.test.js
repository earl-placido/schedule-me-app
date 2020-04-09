import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {
  addGroupMember,
  ADD_GROUP_MEMBER_SUCCESS,
} from '../../src/actions/AddGroupMember.action';

describe('test add group member action', () => {
  let httpMock, store;

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('test addGroupMember action', async () => {
    const groupId = 1;

    httpMock
      .onPost(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members`,
      )
      .reply(200, {groupMemberId: 1});

    await addGroupMember(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(ADD_GROUP_MEMBER_SUCCESS);
    expect(store.getActions()[0].payload).toEqual(1);
    expect(store.getActions()[0].errored).toEqual(false);
  });
});
