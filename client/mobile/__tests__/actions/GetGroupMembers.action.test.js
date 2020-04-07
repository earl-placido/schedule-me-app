import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Config from 'react-native-config';
import configureMockStore from 'redux-mock-store';
import {
  getGroupMembers,
  GET_GROUP_MEMBERS_SUCCESS,
  getGroupMemberWithEmail,
} from '../../src/actions/GetGroupMembers.action';

describe('test get group members action', () => {
  let httpMock, store;

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('test getGroupMembers action', async () => {
    const groupId = 1;
    // handle error response
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/`,
      )
      .reply(500);
    await getGroupMembers(groupId)(store.dispatch);
    expect(store.getActions()[0]).toEqual(undefined);

    // handle happy path
    store.clearActions();
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/`,
      )
      .reply(200, {groupMembers: [1]});
    await getGroupMembers(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(GET_GROUP_MEMBERS_SUCCESS);
    expect(store.getActions()[0].payload).toEqual([1]);
  });

  it('test getGroupMemberWithEmail action', async () => {
    const groupId = 1;
    const userEmail = 'email';
    const userId = 1;
    // handle error response
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/${userEmail}`,
      )
      .reply(500);
    let response = await getGroupMemberWithEmail(groupId, userEmail);
    expect(response).toEqual(undefined);

    // handle error response from userid and groupid to get group member
    store.clearActions();
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/${userEmail}`,
      )
      .reply(200, {userId});
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`,
      )
      .reply(500, {groupMembers: [1]});
    response = await getGroupMemberWithEmail(groupId, userEmail);
    expect(response).toEqual(undefined);

    // handle happy path
    store.clearActions();
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/${userEmail}`,
      )
      .reply(200, {userId});
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`,
      )
      .reply(200, {groupMembers: [1]});
    response = await getGroupMemberWithEmail(groupId, userEmail);
    expect(response).toEqual(1);
  });
});
