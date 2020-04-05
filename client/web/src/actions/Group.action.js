import axios from "axios";

export const getGroupQuery = async id => {
  const authToken = localStorage.getItem("token");
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${id}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  return response;
};

export const getGroupMembersQuery = async groupId => {
  const authToken = localStorage.getItem("token");
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  return response;
};

export const getGroupListQuery = async () => {
  const authToken = localStorage.getItem("token");
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  return response;
};

export const getOptimalTimeQuery = async groupId => {
  const authToken = localStorage.getItem("token");
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/optimaltime/`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  return response.data.optimalTime;
};

export const getMeetingCurrentOptimalTimeQuery = async meetingIds => {
  const stringMeetingIds = meetingIds.toString();
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${stringMeetingIds}/optimaltime/`
  );

  return response.data;
};

export const setCurrentOptimalTimeQuery = async (
  meetingId,
  startTime,
  endTime
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/meetings/${meetingId}/optimaltime/`,
    { startTime, endTime }
  );
  return response.data;
};

export const getMeetingIdsQuery = async groupId => {
  const authToken = localStorage.getItem("token");
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/meetings/`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  return response.data.meetingIds;
};

export const addUserToGroupQuery = async groupId => {
  const authToken = localStorage.getItem("token");

  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/${groupId}/members`,
    {
      headers: {
        accept: "application/json",
        Authorization: `${authToken}`
      }
    }
  );
  return response;
};
