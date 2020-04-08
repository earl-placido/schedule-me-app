import axios from 'axios';
import moment from 'moment';
import MockAdapter from 'axios-mock-adapter';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import configureMockStore from 'redux-mock-store';
import {
  SET_AVAILABILITIES,
  setAvailabilities,
  MARK_DATES,
  SELECT_DATE,
  selectDate,
  showModal,
  SHOW_MODAL,
  cancelAvailability,
  handleChangeRangeHour,
  HANDLE_CHANGE_RANGE_HOUR,
  addAvailability,
  ADD_AVAILABILITY,
  addRangeHour,
  ADD_RANGE_HOUR,
  deleteAvailability,
  DELETE_AVAILABILITY,
  markDates,
} from '../../src/actions/InputAvailability.action';

describe('test input availability action', () => {
  let httpMock, store;
  const flushAllPromises = () => {
    return new Promise(resolve => setImmediate(resolve));
  };

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('test setAvailabilities action', async () => {
    const userEmail = 'email';
    const groupId = 1;
    const userId = 1;
    const groupMemberId = 1;
    AsyncStorage.setItem('userEmail', userEmail);

    // handle get availabiltity error
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/${userEmail}`,
      )
      .reply(200, {userId});
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`,
      )
      .reply(200, {groupMembers: [{GroupMemberId: groupMemberId}]});
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/${groupMemberId}/availability`,
      )
      .reply(200, {error: true});
    await setAvailabilities(groupId)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(SET_AVAILABILITIES);
    expect(store.getActions()[0].payload).toEqual({
      availabilities: {},
      groupMemberId: groupMemberId,
      markedDates: {},
      rangeHours: [[]],
    });

    store.clearActions();
    const date = moment().add(1, 'days');
    const dateFormat = date.format('YYYY-MM-DD');
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/${userEmail}`,
      )
      .reply(200, {userId});
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`,
      )
      .reply(200, {groupMembers: [{GroupMemberId: groupMemberId}]});
    httpMock
      .onGet(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/${groupMemberId}/availability`,
      )
      .reply(200, [
        {'CAST(StartTime as char)': date.format('YYYY-MM-DD HH:mm:ss')},
        {'CAST(StartTime as char)': date.format('YYYY-MM-DD HH:mm:ss')},
      ]);
    await setAvailabilities(groupId)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(MARK_DATES);
    expect(store.getActions()[0].payload).toEqual({
      markedDates: {[dateFormat]: {marked: true}},
    });
    expect(store.getActions()[1].type).toEqual(SET_AVAILABILITIES);
    expect(store.getActions()[1].payload.availabilities).toEqual({
      [dateFormat]: [
        {'CAST(StartTime as char)': date.format('YYYY-MM-DD HH:mm:ss')},
        {'CAST(StartTime as char)': date.format('YYYY-MM-DD HH:mm:ss')},
      ],
    });
    expect(store.getActions()[1].payload.groupMemberId).toEqual(groupMemberId);
  });

  it('test selectDate action', async () => {
    const selectedDate = {dateString: '2020-04-07'};
    let availabilities = undefined;

    // handle when availabilities is undefined
    let response = selectDate(selectedDate, availabilities);
    expect(response.type).toEqual(SELECT_DATE);
    expect(response.payload).toEqual({selectedDate, rangeHours: [[]]});

    // handle happy path
    availabilities = {'2020-04-07': 'rangeHours'};
    response = selectDate(selectedDate, availabilities);
    expect(response.type).toEqual(SELECT_DATE);
    expect(response.payload).toEqual({selectedDate, rangeHours: 'rangeHours'});
  });

  it('test showModal action', () => {
    const response = showModal();
    expect(response.type).toEqual(SHOW_MODAL);
    expect(response.payload).toEqual({modalVisible: true});
  });

  it('test cancelAvailability action', () => {
    // handle undefined rangeHours
    let rangeHours = undefined;
    let response = cancelAvailability(rangeHours);
    expect(response).toEqual(undefined);

    // handle happy path
    rangeHours = [[], [1, 2, 3], [1, 2]];
    response = cancelAvailability(rangeHours);
    expect(response.type).toEqual(SHOW_MODAL);
    expect(response.payload).toEqual({
      modalVisible: false,
      rangeHours: [
        [1, 2, 3],
        [1, 2],
      ],
    });
  });

  it('test handleChangeRangeHour action', () => {
    let selectedTime = null;
    const selectedDate = {dateString: '2020-04-07'};
    const index = 0;
    let startOrEndTimeIndex = 0;
    const rangeHours = [{AvailabilityId: 1}];

    // handle empty selectedTime
    let response = handleChangeRangeHour(
      selectedTime,
      selectedDate,
      index,
      startOrEndTimeIndex,
      rangeHours,
    );
    expect(response.type).toEqual(HANDLE_CHANGE_RANGE_HOUR);
    expect(response.payload).toEqual([[]]);

    // handle selectedTime but with startOrEndIndex = 0
    selectedTime = '12:00 PM';
    response = handleChangeRangeHour(
      selectedTime,
      selectedDate,
      index,
      startOrEndTimeIndex,
      rangeHours,
    );
    expect(response.type).toEqual(HANDLE_CHANGE_RANGE_HOUR);
    expect(response.payload).toEqual([
      {
        AvailabilityId: 1,
        'CAST(StartTime as char)': '2020-04-07 12:00',
        'CAST(EndTime as char)': undefined,
      },
    ]);

    // handle selectedTime but with startOrEndIndex = 1
    startOrEndTimeIndex = 1;
    response = handleChangeRangeHour(
      selectedTime,
      selectedDate,
      index,
      startOrEndTimeIndex,
      rangeHours,
    );
    expect(response.type).toEqual(HANDLE_CHANGE_RANGE_HOUR);
    expect(response.payload).toEqual([
      {
        AvailabilityId: 1,
        'CAST(StartTime as char)': undefined,
        'CAST(EndTime as char)': '2020-04-07 12:00',
      },
    ]);
  });

  it('test addAvailability action', async () => {
    const groupMemberId = 1;
    const dateString = moment();
    const dateInString = dateString.format('YYYY-MM-DD');
    const selectedDate = {dateString};
    let rangeHours = [];
    const availabilities = {};

    // handle rangeHours empty length
    await addAvailability(
      groupMemberId,
      selectedDate,
      rangeHours,
      availabilities,
    )(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(ADD_AVAILABILITY);
    expect(store.getActions()[0].payload).toEqual({
      modalVisible: false,
      rangeHours: [[]],
    });

    // handle empty range hours
    store.clearActions();
    rangeHours = [[], []];
    await addAvailability(
      groupMemberId,
      selectedDate,
      rangeHours,
      availabilities,
    )(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(ADD_AVAILABILITY);
    expect(store.getActions()[0].payload).toEqual({
      modalVisible: false,
      rangeHours: [],
    });

    // handle empty returned ids, error from server
    store.clearActions();
    rangeHours = [
      {AvailabilityId: 1, 'CAST(StartTime as char)': '2020-04-07 12:00:00'},
      {AvailabilityId: 2, 'CAST(EndTime as char)': '2020-04-07 12:00:00'},
    ];
    httpMock
      .onPost(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`,
      )
      .reply(200, {ids: []});
    await addAvailability(
      groupMemberId,
      selectedDate,
      rangeHours,
      availabilities,
    )(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(ADD_AVAILABILITY);
    expect(store.getActions()[0].payload).toEqual({
      modalVisible: false,
      error: 'An error has occurred.  Availability has not been added',
    });

    // handle success happy path
    store.clearActions();
    rangeHours = [
      {AvailabilityId: 1, 'CAST(StartTime as char)': '2020-04-07 12:00:00'},
      {AvailabilityId: 2, 'CAST(EndTime as char)': '2020-04-07 12:00:00'},
    ];
    httpMock
      .onPost(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`,
      )
      .reply(200, {ids: [1, 2]});
    await addAvailability(
      groupMemberId,
      selectedDate,
      rangeHours,
      availabilities,
    )(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(MARK_DATES);
    expect(store.getActions()[0].payload).toEqual({
      markedDates: {[dateInString]: {marked: true}},
    });
    expect(store.getActions()[1].type).toEqual(ADD_AVAILABILITY);
    expect(store.getActions()[1].payload).toEqual({
      availabilities: {
        [dateInString]: [
          {AvailabilityId: 1, 'CAST(StartTime as char)': '2020-04-07 12:00:00'},
          {AvailabilityId: 2, 'CAST(EndTime as char)': '2020-04-07 12:00:00'},
        ],
      },
      error: null,
      modalVisible: false,
      rangeHours: [
        {
          AvailabilityId: 1,
          'CAST(StartTime as char)': '2020-04-07 12:00:00',
        },
        {
          AvailabilityId: 2,
          'CAST(EndTime as char)': '2020-04-07 12:00:00',
        },
      ],
    });
  });

  it('test addRangeHour action', () => {
    const rangeHours = [1];
    const response = addRangeHour(rangeHours);
    expect(response.type).toEqual(ADD_RANGE_HOUR);
    expect(response.payload).toEqual([1, []]);
  });

  it('test deleteAvailability action', async () => {
    let rangeHours = [[]];
    let availabilities = {};
    const selectedDate = {dateString: '2020-04-07'};
    const index = 0;

    // test rangeHours empty
    await deleteAvailability(
      rangeHours,
      availabilities,
      index,
      selectedDate,
    )(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(DELETE_AVAILABILITY);
    expect(store.getActions()[0].payload).toEqual({
      rangeHours: [],
      availabilities: {},
    });

    // test error deleting from server
    const AvailabilityId = 1;
    rangeHours = [[{AvailabilityId}]];
    httpMock
      .onDelete(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`,
        {availabilityIds: [AvailabilityId]},
      )
      .reply(200, {error: true});
    await deleteAvailability(
      rangeHours,
      availabilities,
      index,
      selectedDate,
    )(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(DELETE_AVAILABILITY);
    expect(store.getActions()[0].payload).toEqual({
      rangeHours: [],
      availabilities: {},
    });
    expect(store.getActions()[1].type).toEqual(DELETE_AVAILABILITY);
    expect(store.getActions()[1].payload).toEqual([]);

    // test success
    availabilities = {[selectedDate.dateString]: []};
    httpMock
      .onDelete(
        `${Config.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`,
        {availabilityIds: [AvailabilityId]},
      )
      .reply(200, {success: true});
    await deleteAvailability(
      rangeHours,
      availabilities,
      index,
      selectedDate,
    )(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(DELETE_AVAILABILITY);
    expect(store.getActions()[0].payload).toEqual({
      rangeHours: [],
      availabilities: {},
    });
    expect(store.getActions()[1].type).toEqual(DELETE_AVAILABILITY);
    expect(store.getActions()[1].payload).toEqual([]);
  });

  it('test markDates action', () => {
    let availabilities = undefined;
    let response = markDates(availabilities);
    expect(response.type).toEqual(MARK_DATES);
    expect(response.payload).toEqual({markedDates: {}});

    availabilities = {'2020-04-07': 'date'};
    response = markDates(availabilities);
    expect(response.type).toEqual(MARK_DATES);
    expect(response.payload).toEqual({
      markedDates: {'2020-04-07': {marked: true}},
    });
  });
});
