import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  addAvailabilityQuery,
  getAvailabilityQuery
} from "../../actions/Availability.action";

describe("test availability action", () => {
  let httpMock;

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
  });

  it("test add availability query", async () => {
    const memberId = 1;
    const availabilityIds = [1, 2];
    const startTimes = [1, 1];
    const endTimes = [2, 2];

    const infoToSend = {
      groupMemberId: memberId,
      availabilityIds,
      startTimes,
      endTimes
    };

    httpMock
      .onPost(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`,
        infoToSend
      )
      .reply(200, true);

    const response = await addAvailabilityQuery(
      memberId,
      availabilityIds,
      startTimes,
      endTimes
    );
    expect(response.data).toEqual(true);
  });

  it("test get availability query", async () => {
    const groupMemberId = 1;
    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/${groupMemberId}/availability`
      )
      .reply(200, { returnedValue: true });

    const response = await getAvailabilityQuery(groupMemberId);
    expect(response).toEqual({ returnedValue: true });
  });
});
