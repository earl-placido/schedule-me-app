import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { addAvailabilityQuery, addedAvailability, getAvailabilityQuery } from '../../actions/Availability.action';

describe("test availability action", () => {
    let httpMock;
    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

    beforeEach(() => {
        httpMock = new MockAdapter(axios);
    });

    it("test add availability query", async() => {
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

        httpMock.onPost(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`,
        infoToSend).reply(200, true)

        const response = await addAvailabilityQuery(memberId, availabilityIds, startTimes, endTimes);
        expect(response.data).toEqual(true);
    });
});