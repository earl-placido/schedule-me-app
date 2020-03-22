import axios from "axios";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";

import CreateGroupReducer, {
  updateGroupName,
  updateGroupDescription,
  goPreviousPage,
  goNextPage,
  updateMeetingLocation,
  updateMeetingDuration,
  updateMeetingFrequency,
  GO_NEXT_PAGE,
  GO_PREVIOUS_PAGE,
  UPDATE_GROUP_DESCRIPTION,
  UPDATE_GROUP_NAME,
  UPDATE_MEETING_DURATION,
  UPDATE_MEETING_FREQUENCY,
  UPDATE_MEETING_LOCATION,
  SUBMIT_GROUP_CREATION
} from "../../../actions/screens/CreateGroupScreen.action";

describe("CreateGroup action", () => {
  it("test update group name", () => {
    const updateGroupNameAction = updateGroupName("testgroupname");
    expect(updateGroupNameAction.type).toEqual(UPDATE_GROUP_NAME);
    expect(updateGroupNameAction.payload).toEqual("testgroupname");
  });

  it("test update group description", () => {
    const updateGroupDescriptionAction = updateGroupDescription(
      "testgroupdescription"
    );
    expect(updateGroupDescriptionAction.type).toEqual(UPDATE_GROUP_DESCRIPTION);
    expect(updateGroupDescriptionAction.payload).toEqual(
      "testgroupdescription"
    );
  });

  it("test go next page", () => {
    const groupDescription = "";
    const duration = "";
    const frequency = "";
    const location = "";

    // test empty groupname, success should be false
    let goNextPageAction = goNextPage(
      "",
      groupDescription,
      duration,
      frequency,
      location,
      0
    );
    expect(goNextPageAction.type).toEqual(GO_NEXT_PAGE);
    expect(goNextPageAction.payload.success).toEqual(false);

    // test not empty groupname, success should be true
    goNextPageAction = goNextPage(
      "groupname",
      groupDescription,
      duration,
      frequency,
      location,
      0
    );
    expect(goNextPageAction.type).toEqual(GO_NEXT_PAGE);
    expect(goNextPageAction.payload.success).toEqual(true);
    expect(goNextPageAction.payload.currentPage).toEqual(1);
  });

  it("test go previous page", () => {
    // test previous page at index 0, should be 0
    let goNextPageAction = goPreviousPage(0);
    expect(goNextPageAction.type).toEqual(GO_PREVIOUS_PAGE);
    expect(goNextPageAction.payload).toEqual(0);

    // test previous page at not index 0, should reduce by 1
    goNextPageAction = goPreviousPage(1);
    expect(goNextPageAction.type).toEqual(GO_PREVIOUS_PAGE);
    expect(goNextPageAction.payload).toEqual(0);
  });
});

describe("test CreateGroup reducer", () => {
  const INITIAL_STATE = {
    groupName: "",
    groupDescription: "",
    success: true,
    currentPage: 0
  };

  it("test update group name", () => {
    const payload = { type: UPDATE_GROUP_NAME, payload: "groupName" };
    const reducerItem = CreateGroupReducer(INITIAL_STATE, payload);
    expect(reducerItem.groupName).toEqual("groupName");
  });

  it("test update group description", () => {
    const payload = {
      type: UPDATE_GROUP_DESCRIPTION,
      payload: "groupDescription"
    };
    const reducerItem = CreateGroupReducer(INITIAL_STATE, payload);
    expect(reducerItem.groupDescription).toEqual("groupDescription");
  });

  it("test go next page", () => {
    const payload = {
      type: GO_NEXT_PAGE,
      payload: { success: true, currentPage: 1 }
    };
    const reducerItem = CreateGroupReducer(INITIAL_STATE, payload);
    expect(reducerItem.success).toEqual(true);
    expect(reducerItem.currentPage).toEqual(1);
  });

  it("test go previous page", () => {
    const payload = { type: GO_PREVIOUS_PAGE, payload: 0 };
    const reducerItem = CreateGroupReducer(INITIAL_STATE, payload);
    expect(reducerItem.currentPage).toEqual(0);
  });
});

describe("CreateMeeting action", () => {
  it("test update meeting duration", () => {
    const meetingDuration = updateMeetingDuration("testduration");
    expect(meetingDuration.type).toEqual(UPDATE_MEETING_DURATION);
    expect(meetingDuration.payload).toEqual("testduration");
  });

  it("test update meeting frequency", () => {
    const meetingFrequency = updateMeetingFrequency("testfrequency");
    expect(meetingFrequency.type).toEqual(UPDATE_MEETING_FREQUENCY);
    expect(meetingFrequency.payload).toEqual("testfrequency");
  });

  it("test update meeting location", () => {
    const MeetingLocation = updateMeetingLocation("testlocation");
    expect(MeetingLocation.type).toEqual(UPDATE_MEETING_LOCATION);
    expect(MeetingLocation.payload).toEqual("testlocation");
  });

  it("test go previous page", () => {
    const previousPage = goPreviousPage(1);
    expect(previousPage.type).toEqual(GO_PREVIOUS_PAGE);
    expect(previousPage.payload).toEqual(0);
  });
});

describe("test creation group", () => {
  let store, httpMock;
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it("test submit page", async () => {
    const groupName = "testsubmission";
    const groupDescription = "";
    const duration = { toDate: () => new Date() };
    const frequency = "";
    const location = "";

    httpMock
      .onPost(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups`)
      .reply(200);
    goNextPage(
      groupName,
      groupDescription,
      duration,
      frequency,
      location,
      1
    )(store.dispatch);
    await flushAllPromises();

    expect(store.getActions()[0].type).toEqual(SUBMIT_GROUP_CREATION);
  });
});
