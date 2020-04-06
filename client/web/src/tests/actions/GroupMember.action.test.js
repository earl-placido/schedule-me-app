import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  getMemberIdWithEmail,
  getMemberId
} from "../../actions/GroupMember.action";

describe("test group member action", () => {
  let httpMock;

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
  });

  it("test get member id with email query", async () => {
    const userEmail = "email";
    const userId = "userid";
    const groupId = 1;
    const RETURNED_MEMBER = "theonlymember";

    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/${userEmail}`
      )
      .reply(200, { userId });

    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`
      )
      .reply(200, { groupMembers: [RETURNED_MEMBER] });

    const response = await getMemberIdWithEmail(groupId, userEmail);
    expect(response).toEqual(RETURNED_MEMBER);
  });

  it("test get member id query", async () => {
    const groupId = 1;
    const userId = 2;
    const RETURNED_MEMBER = "theonlymember";

    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members/${userId}`
      )
      .reply(200, { groupMembers: [RETURNED_MEMBER] });

    const response = await getMemberId(groupId, userId);
    expect(response).toEqual(RETURNED_MEMBER);
  });
});
