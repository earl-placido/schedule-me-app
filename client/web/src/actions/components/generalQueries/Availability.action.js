import axios from "axios";

export const addAvailabilityQuery = async (
  memberId,
  availabilityIds,
  startTimes,
  endTimes
) => {
  const infoToSend = {
    groupMemberId: memberId,
    availabilityIds,
    startTimes,
    endTimes
  };
  const addedAvailability = await axios.post(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`,
    infoToSend
  );
  return addedAvailability;
};

export const getAvailabilityQuery = async groupMemberId => {
  const availabilitiesInfo = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/${groupMemberId}/availability`
  );
  return availabilitiesInfo.data;
};
