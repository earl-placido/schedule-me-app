import axios from "axios";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";

import GroupDetailReducer, {
  getGroupMembers,
  GROUP_MEMBERS,
  getSelfMember,
  setOptimalTime,
  getOptimalTime,
  getMeetings,
  selectMeeting,
  selectOptimalTime,
  showModal,
  closeModal,
  GROUP,
  getGroup,
  GROUP_MEMBER,
  OPTIMAL_TIME,
  SET_OPTIMAL_TIME,
  MEETING_IDS,
  SELECT_MEETING_ID,
  SELECT_OPTIMAL_TIME,
  SHOW_GROUP_DETAIL_MODAL
} from "../../../actions/screens/GroupScreen.action";
import { closeErrorModal } from "../../../actions/screens/GroupListScreen.action";
import { CLOSE_ERROR_MODAL } from "../../../actions/components/InputAvailabilityModal.action";

describe("GroupDetail action", () => {
  const INITIAL_STATE = {
    groupMembers: [],
    showErrorModal: false
  };
  let httpMock, store;

  // Storage Mock
  function storageMock() {
    let storage = {};

    return {
      setItem: function(key, value) {
        storage[key] = value || "";
      },
      getItem: function(key) {
        return key in storage ? storage[key] : null;
      },
      removeItem: function(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function(i) {
        const keys = Object.keys(storage);
        return keys[i] || null;
      }
    };
  }
  let originalStorage = window.localStorage;
  let originalSessionStorage = window.sessionStorage;
  beforeAll(() => {
    window.localStorage = storageMock();
    window.sessionStorage = storageMock();
  });

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it("test getGroupMembers", async () => {
    const payload = {
      type: GROUP_MEMBERS,
      payload: { groupMembers: ["Johnny"] }
    };
    const reducerItem = GroupDetailReducer(INITIAL_STATE, payload);
    expect(reducerItem.groupMembers[0]).toEqual("Johnny");

    const groupId = 1;
    const groupMembers = ["1", "2"];
    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members`
      )
      .reply(200, { groupMembers });

    await getGroupMembers(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(GROUP_MEMBERS);
    expect(store.getActions()[0].payload).toEqual({ groupMembers });

    // handle bad path
    store.clearActions();
    await getGroupMembers(2)(store.dispatch); // wrong group id
    expect(store.getActions()[0].type).toEqual(GROUP_MEMBERS);
    expect(store.getActions()[0].payload).toEqual({
      groupMembers: [],
      showErrorModal: true
    });
  });

  it("test get group actions", async () => {
    const groupId = 1;
    const RETURNED_VALUE = { hello: 1 };
    httpMock
      .onGet(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}`)
      .reply(200, RETURNED_VALUE);
    await getGroup(groupId)(store.dispatch);

    expect(store.getActions()[0].type).toEqual(GROUP);
    expect(store.getActions()[0].payload).toEqual({ group: RETURNED_VALUE });

    // handle bad path
    store.clearActions();
    httpMock
      .onGet(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}`)
      .reply(500);
    await getGroup(groupId)(store.dispatch);

    expect(store.getActions()[0].type).toEqual(GROUP);
    expect(store.getActions()[0].payload).toEqual({
      group: [],
      showErrorModal: true
    });
  });

  it("test getSelfMember actions", async () => {
    const groupId = 1;
    const userId = "userId";
    const userEmail = "userEmail";
    const groupMembers = ["theonlymember"];
    // change local storage for a moment
    localStorage.setItem("userEmail", userEmail);

    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/${userEmail}`
      )
      .reply(200, { userId });
    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`
      )
      .reply(200, { groupMembers });

    await getSelfMember(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(GROUP_MEMBER);
    expect(store.getActions()[0].payload).toEqual({
      selfMember: groupMembers[0]
    });

    // test bad path
    store.clearActions();
    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/${userEmail}`
      )
      .reply(500);

    await getSelfMember(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(GROUP_MEMBER);
    expect(store.getActions()[0].payload).toEqual({
      selfMember: null,
      showErrorModal: true
    });
  });

  it("test getOptimalTime actions", async () => {
    const groupId = 1;
    let optimalTime = [
      ["2020-03-01:3_5", 3],
      ["2020-03-02:3_3", 5]
    ];

    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/optimaltime/`
      )
      .reply(200, { optimalTime });

    await getOptimalTime(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(OPTIMAL_TIME);
    expect(store.getActions()[0].payload).toEqual({
      optimalTimes: [[]]
    });

    // handle bad path
    optimalTime = { bestTime: 1 }; // when optimalTime is not array
    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/optimaltime/`
      )
      .reply(200, { optimalTime });
    store.clearActions();
    await getOptimalTime(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(OPTIMAL_TIME);
    expect(store.getActions()[0].payload).toEqual({
      optimalTimes: null,
      showErrorModal: true
    });
  });

  it("test setOptimalTime actions", async () => {
    const meetings = [];
    const meetingId = 1;
    const selectedMeeting = { MeetingId: meetingId }; // selectedMeeting must contain meetingId attribute
    let optimalTime = null;

    // check for optimalTime not set (bad path)
    await setOptimalTime(
      meetings,
      selectedMeeting,
      optimalTime
    )(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SET_OPTIMAL_TIME);
    expect(store.getActions()[0].payload).toEqual({
      meetingModalVisible: false
    });

    // check invalid optimalTime
    store.clearActions();
    optimalTime = 1;
    await setOptimalTime(
      meetings,
      selectedMeeting,
      optimalTime
    )(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SET_OPTIMAL_TIME);
    expect(store.getActions()[0].payload).toEqual({
      meetingModalVisible: false
    });

    // check valid optimalTime
    store.clearActions();
    optimalTime = ["2020-03-01:3_5"];
    httpMock
      .onPost(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${meetingId}/optimaltime/`,
        { startTime: "2020-03-01 03:00:00", endTime: "2020-03-01 05:00:00" }
      )
      .reply(200, { success: true, error: false });
    await setOptimalTime(
      meetings,
      selectedMeeting,
      optimalTime
    )(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SET_OPTIMAL_TIME);
  });

  it("test getMeetings actions", async () => {
    const groupId = 1;
    const meetingAvailableString = "2020-03-01(Sunday) 11:30 - 11:30";
    let meetingIds = [
      { MeetingId: 1, meetingAvailableString },
      { MeetingId: 2, meetingAvailableString },
      { MeetingId: 3, meetingAvailableString }
    ];
    const stringMeetingIds = "1,2,3";
    const startTime = "2020-03-01 11:30:00";
    const endTime = "2020-03-01 11:30:00";

    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/meetings/`
      )
      .reply(200, { meetingIds });
    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${stringMeetingIds}/optimaltime/`
      )
      .reply(200, [
        {
          "CAST(StartTime as char)": startTime,
          "CAST(EndTime as char)": endTime
        },
        {
          "CAST(StartTime as char)": startTime,
          "CAST(EndTime as char)": endTime
        },
        {
          "CAST(StartTime as char)": startTime,
          "CAST(EndTime as char)": endTime
        }
      ]);

    await getMeetings(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(MEETING_IDS);
    expect(store.getActions()[0].payload).toEqual({ meetings: meetingIds });
  });

  it("test selectMeeting actions", async () => {
    const selectedMeeting = 1;
    await selectMeeting(selectedMeeting)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SELECT_MEETING_ID);
    expect(store.getActions()[0].payload).toEqual({ selectedMeeting });
  });

  it("test selectOptimalTime actions", async () => {
    const selectedOptimalTime = 1;
    await selectOptimalTime(selectedOptimalTime)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SELECT_OPTIMAL_TIME);
    expect(store.getActions()[0].payload).toEqual({ selectedOptimalTime });
  });

  it("test showModal actions", async () => {
    let type = "meeting"; // meeting or availability
    await showModal(type)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SHOW_GROUP_DETAIL_MODAL);
    expect(store.getActions()[0].payload).toEqual({
      meetingModalVisible: true
    });

    store.clearActions();
    type = "availability";
    await showModal(type)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SHOW_GROUP_DETAIL_MODAL);
    expect(store.getActions()[0].payload).toEqual({ inputModalVisible: true });

    store.clearActions();
    type = "othervalues";
    await showModal(type)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SHOW_GROUP_DETAIL_MODAL);
    expect(store.getActions()[0].payload).toEqual({
      meetingModalVisible: false,
      inputModalVisible: false
    });
  });

  it("test closeModal actions", async () => {
    await closeModal()(store.dispatch);
    expect(store.getActions()[0].type).toEqual(SHOW_GROUP_DETAIL_MODAL);
    expect(store.getActions()[0].payload).toEqual({
      meetingModalVisible: false,
      inputModalVisible: false
    });
  });

  it("test closeErrorModal actions", async () => {
    await closeErrorModal()(store.dispatch);
    expect(store.getActions()[0].type).toEqual(CLOSE_ERROR_MODAL);
    expect(store.getActions()[0].payload).toEqual(false);
  });

  afterAll(() => {
    window.localStorage = originalStorage;
    window.sessionStorage = originalSessionStorage;
  });
});
