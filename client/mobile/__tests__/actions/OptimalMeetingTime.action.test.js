import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';
import Config from 'react-native-config';
import {
  setCurrentOptimalTimeQuery,
  formatDateToString,
  getMeetingIdsQuery,
  getMeetingCurrentOptimalTimeQuery,
  getOptimalTimes,
} from '../../src/actions/OptimalMeetingTime.action';

describe('test get optimal meeting time action', () => {
  let httpMock;
  const flushAllPromises = () => {
    return new Promise(resolve => setImmediate(resolve));
  };

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
  });

  it('test setCurrentOptimalTimeQuery action', async () => {
    // handle bad path
    const meetingId = 1;
    const startTime = 1;
    const endTime = 2;
    httpMock
      .onPost(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${meetingId}/optimaltime/`,
      )
      .reply(500);
    let response = await setCurrentOptimalTimeQuery(
      meetingId,
      startTime,
      endTime,
    );
    await flushAllPromises();
    expect(response).toEqual(undefined);

    // handle happy path
    httpMock
      .onPost(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${meetingId}/optimaltime/`,
      )
      .reply(200, {success: true});
    response = await setCurrentOptimalTimeQuery(meetingId, startTime, endTime);
    await flushAllPromises();

    expect(response).toEqual({success: true});
  });

  it('test formatDateToString action', () => {
    const startTime = moment();
    const endTime = moment();
    const lastUpdatedTime = moment();
    const day = startTime.format('YYYY-MM-DD (dddd)');
    const startTimeString = startTime.format('HH:mm');
    const endTimeString = endTime.format('HH:mm');
    const lastUpdatedTimeString = lastUpdatedTime.format('YYYY-MM-DD HH:mm');
    const meetingAvailableString = `Date: ${day} ${'\nTime: '}${startTimeString} - ${endTimeString}\nLast Updated: ${lastUpdatedTimeString}`;
    const response = formatDateToString(startTime, endTime, lastUpdatedTime);
    expect(response).toEqual(meetingAvailableString);
  });

  it('test getMeetingIdsQuery action', async () => {
    const groupId = 1;

    // handle error response from server
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/meetings`,
      )
      .reply(500);
    let response = await getMeetingIdsQuery(groupId);
    await flushAllPromises();

    expect(response).toEqual(undefined);

    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/meetings`,
      )
      .reply(200, {meetingIds: [1, 2, 3]});
    response = await getMeetingIdsQuery(groupId);
    await flushAllPromises();

    expect(response).toEqual([1, 2, 3]);
  });

  it('test getMeetingCurrentOptimalTimeQuery action', async () => {
    const meetingIds = [1, 2, 3];
    const stringMeetingIds = meetingIds.toString();

    // handle response error
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${stringMeetingIds}/optimaltime/`,
      )
      .reply(500);
    let response = await getMeetingCurrentOptimalTimeQuery(meetingIds);
    await flushAllPromises();

    expect(response).toEqual(undefined);

    // handle happy path
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${stringMeetingIds}/optimaltime/`,
      )
      .reply(200, {success: true});
    response = await getMeetingCurrentOptimalTimeQuery(meetingIds);
    await flushAllPromises();

    expect(response).toEqual({success: true});
  });
  it('test getOptimalTimes action', async () => {
    const groupId = 1;
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/optimaltime/`,
      )
      .reply(500);
    let response = await getOptimalTimes(groupId);
    await flushAllPromises();

    expect(response).toEqual(undefined);

    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/optimaltime/`,
      )
      .reply(200, {optimalTime: [1, 2, 3]});
    response = await getOptimalTimes(groupId);
    await flushAllPromises();

    expect(response).toEqual([1, 2, 3]);
  });
});
