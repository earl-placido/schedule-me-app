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
} from "../../../actions/screens/GroupScreen.action";
import { closeErrorModal } from "../../../actions/screens/GroupListScreen.action";

describe("GroupDetail action", () => {
  const INITIAL_STATE = {
    groupMembers: [],
    showErrorModal: false
  };
  let httpMock, store;

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it("test getGroupMembers", async() => {
    const payload = {
      type: GROUP_MEMBERS,
      payload: { groupMembers: ["Johnny"] }
    };
    const reducerItem = GroupDetailReducer(INITIAL_STATE, payload);
    expect(reducerItem.groupMembers[0]).toEqual("Johnny");

    const groupId = 1;
    const groupMembers = ['1', '2'];
    httpMock.onGet(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members`).reply(200,{groupMembers});

    await getGroupMembers(groupId)(store.dispatch);
    expect(store.getActions()[0].type).toEqual(GROUP_MEMBERS);
    expect(store.getActions()[0].payload).toEqual({groupMembers});

    // handle bad path
    store.clearActions();
    await getGroupMembers(2)(store.dispatch); // wrong group id
    expect(store.getActions()[0].type).toEqual(GROUP_MEMBERS);
    expect(store.getActions()[0].payload).toEqual({ groupMembers: [], showErrorModal: true });
  });

  it("test get group actions", async() => {
    const groupId = 1;
    await getGroup()(store.dispatch);
  });

  it("test getSelfMember actions", async() => {
    const groupId = 1;
    await getSelfMember(groupId)(store.dispatch);
  });

  it("test getOptimalTime actions", async() => {
    const groupId = 1;
    await getOptimalTime(groupId)(store.dispatch);
  });

  it("test setOptimalTime actions", async() => {
    const groupId = 1;
    const meetings = [];
    const selectedMeeting = 1;
    const optimalTime = 1;

    await setOptimalTime(meetings, selectedMeeting, optimalTime)(store.dispatch);
  });

  it("test getMeetings actions", async() => {
    const groupId = 1;
    await getMeetings(groupId)(store.dispatch);
  });

  it("test selectMeeting actions", async() => {
    const selectedMeeting = 1;
    await selectMeeting(selectedMeeting)(store.dispatch);
  });

  it("test selectOptimalTime actions", async() => {
    const selectedOptimalTime = 1;
    await selectOptimalTime(selectedOptimalTime)(store.dispatch);
  });

  it("test showModal actions", async() => {
    const type = 'meeting'; // meeting or availability
    await showModal(type)(store.dispatch);
  });

  it("test closeModal actions", async() => {
    await closeModal()(store.dispatch);
  });

  it("test closeErrorModal actions", async() => {
    await closeErrorModal()(store.dispatch);
  });

  
});
