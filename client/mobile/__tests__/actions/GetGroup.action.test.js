import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Config from 'react-native-config';
import configureMockStore from 'redux-mock-store';
import {
  getGroup,
  GET_GROUP_INFO_SUCCESS,
  GET_GROUP_INFO_FAILURE,
  toggleInputAvailability,
  TOGGLE_INPUT_AVAILABILITY,
} from '../../src/actions/GetGroup.action';

describe('test get group action', () => {
  let httpMock, store;

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('test getGroup action', async () => {
    const groupId = 1;

    // test bad path
    httpMock
      .onGet(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/`)
      .reply(500, 'failed');
    await getGroup(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(GET_GROUP_INFO_FAILURE);
    expect(store.getActions()[0].errored).toEqual(true);

    // handle happy path
    store.clearActions();
    httpMock
      .onGet(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/`)
      .reply(200, 'success');
    await getGroup(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(GET_GROUP_INFO_SUCCESS);
    expect(store.getActions()[0].payload).toEqual('success');
  });

  it('test toggleInputAvailability', async () => {
    const isInputAvailabilityVisible = true;
    const value = toggleInputAvailability(isInputAvailabilityVisible);
    expect(value.type).toEqual(TOGGLE_INPUT_AVAILABILITY);
    expect(value.payload).toEqual(!isInputAvailabilityVisible);
  });
});
