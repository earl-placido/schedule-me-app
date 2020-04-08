import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import configureMockStore from 'redux-mock-store';
import {
  getGroupOptimalTime,
  GET_OPTIMAL_TIMES,
  selectMeeting,
  SELECT_MEETING,
  selectOptimalTime,
  SELECT_OPTIMAL_TIME,
  getAllOptimalTimes,
  toggleMeetingModal,
  TOGGLE_MEETING_MODAL,
  setOptimalTime,
  SET_OPTIMAL_TIME,
  getSelfMember,
  GET_GROUP_MEMBER,
} from '../../src/actions/GetOptimalMeetingTime.action';

describe('test get optimal meeting time action', () => {
  let httpMock, store;

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('test getGroupOptimalTime action', async () => {
    const groupId = 1;
    const stringMeetingIds = [1, 2].toString();

    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/meetings`,
      )
      .reply(200, {meetingIds: [{MeetingId: 1}, {MeetingId: 2}]});
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${stringMeetingIds}/optimaltime/`,
      )
      .reply(200, [
        {
          'CAST(StartTime as char)': '2020-04-07 12:00:00',
          'CAST(EndTime as char)': '2020-04-07 1:00:00',
          LastUpdated: '2020-04-07: 1:00:00',
        },
        {
          'CAST(StartTime as char)': '2020-04-07 12:00:00',
          'CAST(EndTime as char)': '2020-04-07 1:00:00',
          LastUpdated: '2020-04-07: 1:00:00',
        },
      ]);
    await getGroupOptimalTime(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(GET_OPTIMAL_TIMES);
    expect(store.getActions()[0].payload).toEqual({
      meetings: [
        {
          MeetingId: 1,
          meetingTimeString:
            'Date: 2020-04-07 (Tuesday) \n' +
            'Time: 12:00 - 01:00\n' +
            'Last Updated: 2020-04-07 01:00',
        },
        {
          MeetingId: 2,
          meetingTimeString:
            'Date: 2020-04-07 (Tuesday) \n' +
            'Time: 12:00 - 01:00\n' +
            'Last Updated: 2020-04-07 01:00',
        },
      ],
    });
  });
  it('test selectMeeting action', async () => {
    const selectedMeeting = 1;
    await selectMeeting(selectedMeeting)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SELECT_MEETING);
    expect(store.getActions()[0].payload).toEqual({selectedMeeting});
  });

  it('test selectOptimalTime action', async () => {
    const selectedOptimalTime = 1;
    await selectOptimalTime(selectedOptimalTime)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SELECT_OPTIMAL_TIME);
    expect(store.getActions()[0].payload).toEqual({selectedOptimalTime});
  });
  it('test getAllOptimalTimes action', async () => {
    const groupId = 1;

    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/optimaltime/`,
      )
      .reply(200, {optimalTime: 1});
    await getAllOptimalTimes(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SELECT_MEETING);
    expect(store.getActions()[0].payload).toEqual({optimalTimes: 1});
  });
  it('test toggleMeetingModal action', async () => {
    const isMeetingModalVisible = false;
    const response = toggleMeetingModal(isMeetingModalVisible);
    expect(response.type).toEqual(TOGGLE_MEETING_MODAL);
    expect(response.payload.isMeetingModalVisible).toEqual(
      !isMeetingModalVisible,
    );
  });
  it('test setOptimalTime action', async () => {
    let optimalTime = null;
    let meetings = null;
    let selectedMeeting = null;

    // handle empty optimalTime
    await setOptimalTime(
      meetings,
      selectedMeeting,
      optimalTime,
    )(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SET_OPTIMAL_TIME);
    expect(store.getActions()[0].payload).toEqual({
      isMeetingModalVisible: false,
    });

    // handle unchanged time
    optimalTime = ['2020-04-07:12_2', 3]; // [date selected, total people available]
    selectedMeeting = {MeetingId: 1};
    store.clearActions();
    httpMock
      .onPost(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${selectedMeeting.MeetingId}/optimaltime/`,
      )
      .reply(200, {changedTime: false});
    await setOptimalTime(
      meetings,
      selectedMeeting,
      optimalTime,
    )(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SET_OPTIMAL_TIME);
    expect(store.getActions()[0].payload).toEqual({
      selectedSameOptimalTime: true,
      meetingModalVisible: false,
    });

    // handle changed time
    optimalTime = ['2020-04-07:12_2', 3]; // [date selected, total people available]
    selectedMeeting = {MeetingId: 1};
    meetings = [{MeetingId: 1}, {MeetingId: 2}];
    store.clearActions();
    httpMock
      .onPost(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${selectedMeeting.MeetingId}/optimaltime/`,
      )
      .reply(200, {changedTime: true});
    await setOptimalTime(
      meetings,
      selectedMeeting,
      optimalTime,
    )(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SET_OPTIMAL_TIME);
    expect(store.getActions()[0].payload.selectedSameOptimalTime).toEqual(
      false,
    );
    expect(store.getActions()[0].payload.meetingModalVisible).toEqual(false);
    expect(store.getActions()[0].payload.meetings[1]).toEqual({MeetingId: 2});
    expect(store.getActions()[0].payload.meetings[0].MeetingId).toEqual(1);
  });

  it('test getSelfMember action', async () => {
    const groupId = 1;
    const userId = 1;
    const groupMember = 1;
    const userEmail = 'email';

    // handle bad path (no email)
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/${userEmail}`,
      )
      .reply(200, {userId});
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`,
      )
      .reply(200, {groupMembers: [groupMember]});
    await getSelfMember(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(GET_GROUP_MEMBER);
    expect(store.getActions()[0].payload).toEqual({
      selfMember: undefined,
    });

    // handle error response
    store.clearActions();
    AsyncStorage.setItem('userEmail', userEmail);
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/${userEmail}`,
      )
      .reply(200, {userId});
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`,
      )
      .reply(500, {groupMembers: [groupMember]});
    await getSelfMember(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(GET_GROUP_MEMBER);
    expect(store.getActions()[0].payload).toEqual({selfMember: undefined});

    // handle good path
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
      .reply(200, {groupMembers: [groupMember]});
    await getSelfMember(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(GET_GROUP_MEMBER);
    expect(store.getActions()[0].payload).toEqual({selfMember: groupMember});
  });
});
