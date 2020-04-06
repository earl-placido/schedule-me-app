import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  getGroupQuery,
  getGroupMembersQuery,
  getGroupListQuery,
  getOptimalTimeQuery,
  getMeetingCurrentOptimalTimeQuery,
  setCurrentOptimalTimeQuery,
  getMeetingIdsQuery
} from "../../actions/Group.action";

describe("test availability action", () => {
  let httpMock;

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
  });

  it("test get group query", async () => {
    const id = 1;
    httpMock
      .onGet(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${id}`)
      .reply(200, { response: true });
    const response = await getGroupQuery(id);
    expect(response.data).toEqual({ response: true });
  });

  it("test get group members query", async () => {
    const groupId = 1;
    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members`
      )
      .reply(200, { response: true });
    const response = await getGroupMembersQuery(groupId);
    expect(response.data).toEqual({ response: true });
  });

  it("test get group list query", async () => {
    httpMock
      .onGet(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`)
      .reply(200, { response: true });
    const response = await getGroupListQuery();
    expect(response.data).toEqual({ response: true });
  });

  it("test get optimal time query", async () => {
    const groupId = 1;
    const RETURNED_VALUE = "optimaltime";
    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/optimaltime/`
      )
      .reply(200, { optimalTime: RETURNED_VALUE });
    const response = await getOptimalTimeQuery(groupId);
    expect(response).toEqual(RETURNED_VALUE);
  });

  it("test get meeting current optimal time query", async () => {
    const stringMeetingIds = "1,2,3";
    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${stringMeetingIds}/optimaltime/`
      )
      .reply(200, { response: true });
    const response = await getMeetingCurrentOptimalTimeQuery(stringMeetingIds);
    expect(response).toEqual({ response: true });
  });

  it("test set current optimal time query", async () => {
    const meetingId = 1;
    const startTime = 0;
    const endTime = 0;
    const RETURNED_VALUE = "returned_value";

    httpMock
      .onPost(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${meetingId}/optimaltime/`
      )
      .reply(200, RETURNED_VALUE);
    const response = await setCurrentOptimalTimeQuery(
      meetingId,
      startTime,
      endTime
    );
    expect(response).toEqual(RETURNED_VALUE);
  });

  it("test get meeting ids query", async () => {
    const groupId = 1;
    const RETURNED_VALUE = "meetingIdsreturned";
    const authToken = localStorage.getItem("token");

    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/meetings/`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${authToken}`
          }
        }
      )
      .reply(200, { meetingIds: RETURNED_VALUE });
    const response = await getMeetingIdsQuery(groupId);
    expect(response).toEqual(RETURNED_VALUE);
  });
});
