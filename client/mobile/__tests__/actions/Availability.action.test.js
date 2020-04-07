import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Config from 'react-native-config';
import { addAvailabilityQuery, getAvailabilites, deleteAvailabilityQuery } from '../../src/actions/Availability.action';


describe('test availability action', () => {
  let httpMock;

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
  });

  it('test add availability query', async () => {
      const groupMemberId = 1;
      const availabilityIds = [];
      const startTimes = [];
      const endTimes = [];

      // handle error
      httpMock.onPost(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`, {groupMemberId, availabilityIds, startTimes, endTimes}).reply(500);
      let response = await addAvailabilityQuery(groupMemberId, availabilityIds, startTimes, endTimes);
      expect(response).toEqual([]);

      // handle happy path
      httpMock.onPost(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`, {groupMemberId, availabilityIds, startTimes, endTimes}).reply(200, {ids: [1, 2]});
      response = await addAvailabilityQuery(groupMemberId, availabilityIds, startTimes, endTimes);
      expect(response).toEqual([1,2]);

  });

  it('test getAvailabilites', async () => {
      const groupMemberId = 1;
      httpMock.onGet(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/${groupMemberId}/availability`).reply(200, 'success');
      response = await getAvailabilites(groupMemberId);
      expect(response).toEqual('success');
  });
  it('test deleteAvailabilityQuery query', async () => {
    const availabilityId = 1;
    httpMock.onDelete(`${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`).reply(200, 'success');
    response = await deleteAvailabilityQuery(availabilityId);
    expect(response).toEqual('success');
  });

});